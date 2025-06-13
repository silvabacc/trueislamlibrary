import {
  Autocomplete,
  Container,
  Divider,
  Grid,
  Image,
  Group,
  Text,
  Flex,
  BackgroundImage,
  Stack,
} from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../client";
import { badges } from "../utils";
import Pill from "../components/Pill";
import Azhar from "../assets/azhar.webp";
import { ArticleCard } from "../components/Card";

const fetchNewPosts = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  image,
  body,
  tags,
  publishedAt
}`;
  const posts = await sanityClient.fetch(query);
  return posts;
};

export default function Library() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["newPosts"],
    queryFn: fetchNewPosts,
  });

  console.log(data);

  return (
    <>
      <div>
        <BackgroundImage h={200} src={Azhar}>
          <Stack
            h={"100%"}
            style={{ color: "white", textAlign: "center" }}
            justify="center"
            gap={0}
          >
            <h1 style={{ margin: 0 }}>Articles from the True Islam Library</h1>
            <p style={{ margin: 0 }}>
              Your source for authentic Islamic articles, insights, and
              understanding.
            </p>
          </Stack>
        </BackgroundImage>
      </div>
      <Container my="lg">
        <Flex></Flex>
        <Autocomplete
          flex={2}
          placeholder="Search"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          visibleFrom="xs"
        />
        <Text size="sm" mt="sm" c="dimmed">
          Filters
        </Text>
        <Group my="sm">
          {badges.map((badge) => (
            <Pill selectable key={badge.value}>
              {badge.title}
            </Pill>
          ))}
        </Group>
        <Text size="sm" my="sm" c="dimmed">
          Trending
        </Text>
        <Grid>
          {data?.map((post) => (
            <Grid.Col key={post._id} span={4}>
              <ArticleCard
                title={post.title}
                body={post.body}
                tags={post.tags}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
