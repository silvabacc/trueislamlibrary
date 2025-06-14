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
import classes from "./Home.module.css";

import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../client";
import { badges } from "../utils";
import Pill from "../components/Pill";
import Azhar from "../assets/azhar.webp";
import { ArticleCard } from "../components/Card";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["newPosts"],
    queryFn: fetchNewPosts,
  });

  const onClickCard = (slug: string) => {
    navigate(`/post/${slug}`);
  };

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
                onClick={() => onClickCard(post.slug.current)}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
