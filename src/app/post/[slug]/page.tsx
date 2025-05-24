"use client";

import { SanityDocument } from "next-sanity";
import { use, useEffect, useState } from "react";
import { fetchPost } from "../actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SkeletonCard from "./card.skeleton";
import ReactPlayer from "react-player";
import { PortableText, PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
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
    tiktok: ({ value }) => {
      const { url } = value;
      const match = url.match(/\/video\/(\d+)/);
      return (
        <div className="flex justify-center">
          <div className="rounded bg-(--background) p-4 w-full">
            <blockquote
              className="tiktok-embed"
              data-video-id={match[1]}
              style={{ maxHeight: "605px", minWidth: "325px;" }}
            >
              <section></section>{" "}
            </blockquote>{" "}
            <script async src="https://www.tiktok.com/embed.js"></script>
          </div>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="my-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-100 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-8">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-8">{children}</ol>
    ),
  },
  listItem: ({ children }) => <li className="relative py-1">{children} </li>,
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          className="text-blue-600 hover:text-blue-800"
          href={value.href}
          target="_blank"
          rel={rel}
        >
          {children}
        </a>
      );
    },
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
