import { Autocomplete, Container } from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { sanityClient } from "../client";
import type { Post } from "../types";

function SearchLibrary() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const fetchPosts = async () => {
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

        const filteredBySearch = debouncedSearch.trim()
          ? result.filter((post: Post) => {
              const plainBody = post.body
                ?.map((block: any) =>
                  block.children?.map((child: any) => child.text).join(" ")
                )
                .join(" ");

              const fullText = `${post.title} ${plainBody || ""}`.toLowerCase();
              return fullText.includes(debouncedSearch.toLowerCase());
            })
          : result;

        setPosts(filteredBySearch);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [debouncedSearch]);

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
      {posts?.map((post) => post.title)}
    </Container>
  );
}

export default PageTransition(SearchLibrary);
