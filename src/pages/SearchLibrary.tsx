import { Autocomplete, Container, Divider, Grid, Text } from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { sanityClient } from "../client";
import type { Post } from "../types";
import classes from "./SearchLibrary.module.css";
import { useNavigate } from "react-router";

const stopWords = new Set([
  "the",
  "is",
  "in",
  "and",
  "of",
  "to",
  "a",
  "an",
  "that",
  "it",
  "on",
  "for",
  "with",
  "as",
  "this",
  "be",
  "are",
  "was",
  "by",
  "at",
  "from",
  "or",
  "which",
  "but",
  "not",
  "my",
]);

function SearchLibrary() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [matchedPosts, setMatchedPosts] = useState<
    { post: Post; paragraphs: string[] }[]
  >([]);
  const navigate = useNavigate();

  // Debounce the search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const fetchPosts = async () => {
      const normalize = (text: string) =>
        text
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .trim();

      const searchTerm = normalize(debouncedSearch);
      const searchWords = searchTerm
        .split(/\s+/)
        .filter((word) => word && !stopWords.has(word));

      if (!debouncedSearch.trim() || searchWords.length === 0) {
        setMatchedPosts([]);
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
        const results: Post[] = await sanityClient.fetch(query);

        const matched = results
          .map((post) => {
            const plainBody =
              post.body
                ?.map((block: any) =>
                  block.children?.map((child: any) => child.text).join(" ")
                )
                .join("\n\n") || "";

            const paragraphs = plainBody.split(/\n{2,}/);

            const matchedParagraphs = paragraphs
              .map((paragraph) => {
                const normalized = normalize(paragraph);
                const fullMatch = normalized.includes(searchTerm);
                const partialMatches = searchWords.filter((word) =>
                  normalized.includes(word)
                ).length;

                if (fullMatch || partialMatches > 0) {
                  return {
                    paragraph,
                    score: (fullMatch ? 10 : 0) + partialMatches,
                  };
                }
                return null;
              })
              .filter(Boolean)
              .sort((a, b) => b!.score - a!.score)
              .map((match) => match!.paragraph);

            if (matchedParagraphs.length > 0) {
              return { post, paragraphs: matchedParagraphs.slice(0, 3) };
            }
            return null;
          })
          .filter(Boolean) as { post: Post; paragraphs: string[] }[];

        setMatchedPosts(matched);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [debouncedSearch]);

  // Highlight keywords in a paragraph
  const highlightMatches = (text: string, keywords: string[]) => {
    let highlighted = text;
    keywords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: var(--highlight-color); font-weight: 500;">$1</span>`
      );
    });
    return highlighted;
  };

  const onClick = (slug: string) => {
    navigate(`/post/${slug}`);
  };

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
        {matchedPosts.map(({ post, paragraphs }) => (
          <Grid.Col
            span={12}
            key={post._id}
            className={classes.search__result}
            onClick={() => onClick(post.slug.current)}
          >
            <Text fw={800}>{post.title}</Text>
            {paragraphs.map((para, idx) => (
              <Text
                key={idx}
                c="dimmed"
                size="sm"
                mt={4}
                dangerouslySetInnerHTML={{
                  __html: highlightMatches(
                    para,
                    debouncedSearch
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "")
                      .split(/\s+/)
                      .filter((word) => word && !stopWords.has(word))
                  ),
                }}
              />
            ))}
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

export default PageTransition(SearchLibrary);
