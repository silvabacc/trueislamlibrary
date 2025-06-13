import {
  Autocomplete,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Text,
} from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";
import { ArticleCard } from "../components/Card";
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../client";
import type { Post } from "../types";
import { badges } from "../utils";
import Pill from "../components/Pill";

const fetchNewPosts = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  image,
  tags,
  publishedAt
}`;
  const posts = await sanityClient.fetch(query);
  return posts;
};

export default function Library() {
  const { isPending, isError, data, error } = useQuery<Post[]>({
    queryKey: ["newPosts"],
    queryFn: fetchNewPosts,
  });

  return (
    <Container my="lg">
      <Grid>
        <Grid.Col span={3}>
          <h1>Articles from our library</h1>
          <p>
            Your source for authentic Islamic articles, insights, and
            understanding.
          </p>
        </Grid.Col>
        {data?.map((post) => (
          <Grid.Col key={post._id} span={3}>
            <ArticleCard
              title={post.title}
              imageUrl={post.image}
              tags={post.tags}
            />
          </Grid.Col>
        ))}
      </Grid>
      <Divider my="lg" />
      <Text size="sm" mt="sm" c="dimmed">
        Filters
      </Text>
      <Flex align={"center"}>
        <Group flex={4} my="sm">
          {badges.map((badge) => (
            <Pill key={badge.value}>{badge.title}</Pill>
          ))}
        </Group>
        <Autocomplete
          flex={2}
          placeholder="Search"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          visibleFrom="xs"
        />
      </Flex>
      <Text size="sm" mt="sm" c="dimmed">
        Trending
      </Text>
    </Container>
  );
}
