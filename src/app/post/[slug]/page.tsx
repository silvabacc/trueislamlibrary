"use client";

import "github-markdown-css/github-markdown.css";

import { SanityDocument } from "next-sanity";
import { use, useEffect, useState } from "react";
import { fetchPost } from "../actions";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [post, setPost] = useState<SanityDocument>();
  const { slug } = use(params);

  useEffect(() => {
    const fetch = async () => {
      const post = await fetchPost(slug);
      setPost(post);
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl space-y-4">
        <Card>
          <CardHeader>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {post?.["title"]}
            </h2>
          </CardHeader>
          <CardContent>
            <div
              style={{ backgroundColor: "var(--card)" }}
              className="markdown-body p-4"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post?.["markdown"]}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
