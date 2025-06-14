import {
  Blockquote,
  Container,
  Flex,
  Group,
  Stack,
  TableOfContents,
  Text,
} from "@mantine/core";
import { sanityClient } from "../client";
import { useQuery } from "@tanstack/react-query";
import PortableText from "react-portable-text";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import Pill from "../components/Pill";
import { type Post } from "../types";
import { badges } from "../utils";
import classes from "./Post.module.css";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

const fetchPost = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const params = { slug };
  const post = await sanityClient.fetch(query, params);
  return post;
};

function PostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, error, isPending, isError } = useQuery<Post>({
    queryKey: ["newPosts", slug],
    queryFn: () => fetchPost(slug!),
    enabled: !!slug,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!data) return <div>No post found</div>;

  return (
    <Container display={"flex"} size={"xl"}>
      <Group gap={12} className={classes.tags__wrapper} pb={12}>
        <Stack w={320}>
          <Text size="sm" ml={4} mt="sm" my="sm" c="dimmed">
            Tags
          </Text>
          <Flex wrap={"wrap"} gap={4}>
            {data.tags.map((tag) => (
              <Pill key={tag} isSelectable={false}>
                {badges.find((b) => b.value === tag)?.title}
              </Pill>
            ))}
          </Flex>
        </Stack>
        <Text ml={4} size="sm" my="xs" c="dimmed">
          Table of contents
        </Text>
        <TableOfContents
          variant="filled"
          scrollSpyOptions={{
            selector: "h1, h2, h3, h4, h5, h6",
          }}
          getControlProps={({ data }) => ({
            onClick: () => data.getNode().scrollIntoView(),
            children: data.value,
          })}
        />
      </Group>
      <div className={classes.content}>
        <PortableText
          content={data.body}
          serializers={{
            link: ({ children }) => (
              <LinkPreview
                url={children}
                width={400}
                fallback={
                  <a href={children} target="_target">
                    {children}
                  </a>
                }
              />
            ),
            youtube: ({ url }) => {
              return (
                <div className={classes.youtube}>
                  <ReactPlayer url={url} width="100%" height="100%" controls />
                </div>
              );
            },
            blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
          }}
        />
      </div>
    </Container>
  );
}

export default PostPage;
