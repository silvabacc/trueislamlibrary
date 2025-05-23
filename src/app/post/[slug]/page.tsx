"use client";

import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import { fetchPost } from "../actions";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<SanityDocument>();
  useEffect(() => {
    const fetch = async () => {
      const post = await fetchPost(params.slug);
      setPost(post);
    };
    fetch();
  }, []);
  console.log(post);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl space-y-4">
        <Card className="">
          <CardHeader>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {post?.["title"]}
            </h2>
          </CardHeader>
          <CardContent>
            <Markdown>{post?.["markdown"]}</Markdown>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
