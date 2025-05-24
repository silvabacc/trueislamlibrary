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

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
