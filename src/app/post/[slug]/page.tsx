"use client";

import { SanityDocument } from "next-sanity";
import { use, useEffect, useState } from "react";
import { fetchPost } from "../actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SkeletonCard from "./card.skeleton";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/common/sanity-components";

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
