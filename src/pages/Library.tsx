import {
  Autocomplete,
  Container,
  Grid,
  Group,
  Text,
  Flex,
  BackgroundImage,
  Stack,
} from "@mantine/core";
import classes from "./Library.module.css";

import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { sanityClient } from "../client";
import { badges } from "../utils";
import Pill from "../components/Pill";
import Azhar from "../assets/azhar.webp";
import { ArticleCard } from "../components/Card";
import type { Post } from "../types";
import PageTransition from "../animations/PageTransition";

function Library() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  // Debounce search input by 1 second
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

  // Filter by tags if any selected
  const filteredPosts = selected.length
    ? posts.filter((post) =>
        post.tags.some((tag: string) => selected.includes(tag))
      )
    : posts;

  return (
    <>
      <div>
        <BackgroundImage h={200} src={Azhar}>
          <Stack
            h={"100%"}
            className={classes.image__text}
            justify="center"
            gap={0}
          >
            <h1 className={classes.header}>
              Articles from the True Islam Library
            </h1>
            <Text className={classes.sub} fw={800}>
              Your source for authentic Islamic articles, insights, and
              understanding.
            </Text>
          </Stack>
        </BackgroundImage>
      </div>

      <Container my="lg">
        <Autocomplete
          flex={2}
          onChange={setSearch}
          placeholder="Search articles..."
          leftSection={<IconSearch size={16} stroke={1.5} />}
          visibleFrom="xs"
          value={search}
        />

        <Text size="sm" mt="sm" c="dimmed">
          Filters
        </Text>

        <Group my="sm">
          {badges.map((badge) => {
            const isSelected = selected.includes(badge.value);
            return (
              <Pill
                key={badge.value}
                selected={isSelected}
                onClick={() => {
                  setSelected((prev) =>
                    isSelected
                      ? prev.filter((tag) => tag !== badge.value)
                      : [...prev, badge.value]
                  );
                }}
              >
                {badge.title}
              </Pill>
            );
          })}
        </Group>

        <Grid>
          {filteredPosts.map((post) => (
            <Grid.Col key={post._id} span={4}>
              <ArticleCard
                title={post.title}
                body={post.body}
                tags={post.tags}
                onClick={() => navigate(`/post/${post.slug.current}`)}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default PageTransition(Library);
