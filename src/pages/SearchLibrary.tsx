import { Autocomplete, Container, Grid, Text } from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { sanityClient } from "../client";
import type { Post } from "../types";

function SearchLibrary() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!debouncedSearch.trim()) {
        setPosts([]);
        return;
      }

      const query = `*[_type == "post"] | order(publishedAt desc)[0...50] {
        _id,
        title,
        slug,
        image,
        body,
        tags,
        publishedAt
      }`;

      try {
        const result = await sanityClient.fetch(query);
        setPosts(result);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [debouncedSearch]);

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .trim();

  return (
    <Container>
      <h1>Search library</h1>
      <Autocomplete
        flex={2}
        onChange={setSearch}
        placeholder="Search articles..."
        leftSection={<IconSearch size={16} stroke={1.5} />}
        visibleFrom="xs"
        value={search}
      />
      <Grid py={24}>
        {posts?.map((post) => {
          const plainBody =
            post.body
              ?.map((block: any) =>
                block.children?.map((child: any) => child.text).join(" ")
              )
              .join(" ") || "";

          const searchTerm = normalize(debouncedSearch);
          const searchWords = searchTerm.split(/\s+/);

          const sentences = plainBody.match(/[^.!?\n]+[.!?]*/g) || [];

          const matched = sentences
            .map((sentence) => {
              const sentenceNorm = normalize(sentence);
              const fullMatch = sentenceNorm.includes(searchTerm);
              const partialMatches = searchWords.filter((word) =>
                sentenceNorm.includes(word)
              ).length;

              if (fullMatch || partialMatches > 0) {
                return {
                  sentence,
                  score: (fullMatch ? 10 : 0) + partialMatches,
                };
              }
              return null;
            })
            .filter(Boolean)
            .sort((a, b) => b!.score - a!.score)
            .slice(0, 2); // Top 2 sentences

          const highlighted = matched
            .map(({ sentence }) => {
              let highlightedSentence = sentence;
              searchWords.forEach((word) => {
                const regex = new RegExp(`(${word})`, "gi");
                highlightedSentence = highlightedSentence.replace(
                  regex,
                  '<span style="color: var(--highlight-color); font-weight: 500;">$1</span>'
                );
              });
              return `<p style="margin-bottom: 4px;">${highlightedSentence}</p>`;
            })
            .join("");

          return (
            <Grid.Col span={12} key={post._id}>
              <Text fw={800}>{post.title}</Text>
              {debouncedSearch && highlighted && (
                <Text
                  c="dimmed"
                  size="sm"
                  mt={4}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              )}
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}

export default PageTransition(SearchLibrary);
