"use client";

import remarkBreaks from "remark-breaks";
import { SanityDocument } from "next-sanity";
import { use, useEffect, useState } from "react";
import { fetchPost } from "../actions";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SkeletonCard from "./card.skeleton";
import rehypeRaw from "rehype-raw";
import ReactPlayer from "react-player";
import { PortableText } from "@portabletext/react";

const components = {
  types: {
    youtube: ({ value }) => {
      const { url } = value;
      return (
        <div className="flex justify-center">
          <div className="rounded bg-(--background) p-4">
            <ReactPlayer url={url} />
          </div>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="my-4">{children}</p>,
  },
};

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [post, setPost] = useState<SanityDocument>();
  const { slug } = use(params);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const post = await fetchPost(slug);
      setPost(post);
      setIsLoading(false);
    };
    fetch();
  }, []);

  console.log(post?.["markdown"]);

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full max-w-3xl space-y-4">
        {isLoading && <SkeletonCard />}
        <Card>
          <CardHeader>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {post?.["title"]}
            </h2>
          </CardHeader>
          <CardContent>
            <div style={{ backgroundColor: "var(--card)" }} className="px-4 ">
              <PortableText value={post?.["body"]} components={components} />
              {/* <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  ul: ({ children }) => (
                    <ul className="list-disc ml-12">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-6">{children}</ol>
                  ),
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  p: ({ children }) => <p className="py-2">{children}</p>,
                }}
              >
                {post?.["markdown"] || ""}
              </ReactMarkdown> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
