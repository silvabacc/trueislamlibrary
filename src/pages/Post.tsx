import {
  Blockquote,
  Button,
  Container,
  Drawer,
  Flex,
  Group,
  Stack,
  TableOfContents,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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
import { useDisclosure } from "@mantine/hooks";

const fetchPost = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const params = { slug };
  const post = await sanityClient.fetch(query, params);
  return post;
};

function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { data, error, isPending, isError } = useQuery<Post>({
    queryKey: ["newPosts", slug],
    queryFn: () => fetchPost(slug!),
    enabled: !!slug,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!data) return <div>No post found</div>;

  const tableOfContents = (
    <>
      <Text ml={4} size="sm" my="xs" c="dimmed">
        Table of contents
      </Text>
      <TableOfContents
        variant="filled"
        scrollSpyOptions={{
          selector: "h1, h2, h3, h4, h5, h6",
        }}
        getControlProps={({ data }) => ({
          onClick: () => {
            data.getNode().scrollIntoView();
            closeDrawer();
          },
          children: data.value,
        })}
      />
    </>
  );

  return (
    <div>
      <Container display="flex" size="xl">
        <Group
          gap={12}
          className={classes.tags__wrapper}
          pb={12}
          visibleFrom="xs"
        >
          <Stack w={320}>
            <Text size="sm" ml={4} mt="sm" my="sm" c="dimmed">
              Tags
            </Text>
            <Flex wrap="wrap" gap={4}>
              {data.tags.map((tag) => (
                <Pill key={tag} isSelectable={false}>
                  {badges.find((b) => b.value === tag)?.title}
                </Pill>
              ))}
            </Flex>
            {!isMobile && tableOfContents}
          </Stack>
        </Group>

        <Flex direction="column" className={classes.content}>
          {isMobile && (
            <>
              <Button onClick={openDrawer} variant="light" mb="md">
                Table of Contents
              </Button>
              <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                withCloseButton={true}
                position="right"
                size="100%"
                overlayProps={{ opacity: 1 }}
                withinPortal={false}
                styles={{
                  content: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: "100vw",
                    maxWidth: "100vw",
                    maxHeight: "100vh",
                    borderRadius: 0,
                  },
                  body: {
                    height: "100%",
                    padding: "1rem",
                    overflowY: "auto",
                  },
                }}
              >
                {tableOfContents}
              </Drawer>
            </>
          )}

          <h1>{data.title}</h1>
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
              youtube: ({ url }) => (
                <div className={classes.youtube}>
                  <ReactPlayer url={url} width="100%" height="100%" controls />
                </div>
              ),
              blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
            }}
          />
        </Flex>
      </Container>
    </div>
  );
}

export default PostPage;
