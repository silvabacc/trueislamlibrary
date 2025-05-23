"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPosts } from "./actions";
import { formatElapsedDate, haveIntersection } from "@/lib/utils";
import { SkeletonCard } from "@/components/ui/skeleton.card";

const badges = [
  { title: "🕋 Islam", value: "islam" },
  { title: "✅ Proofs", value: "proofs" },
  { title: "📖 Quran", value: "quran" },
  { title: "🌕 New to Islam", value: "new to islam" },
  { title: "💞 Marriage", value: "marriage" },
  { title: "🫂 Adab", value: "adab" },
  { title: "⛓️ Slavery", value: "slavery" },
  { title: "📿 Tawassul", value: "tawassul" },
  { title: "☝️ Aqeeda", value: "aqeeda" },
  { title: "🌙 Islambackup", value: "islambackup" },
  { title: "🛡️ Defense", value: "defense" },
  { title: "🌹 Aisha RA", value: "aishara" },
  { title: "❤️ Prophet Muhammad ﷺ", value: "rasulallah" },
  { title: "⛪️ Christianity", value: "christianity" },
  { title: "⚛️ Atheism", value: "atheism" },
  { title: "8thmane", value: "8thmane" },
  { title: "📚 Library", value: "library" },
  { title: "🗣️ Debate", value: "debate" },
  { title: "🏴 Salafi", value: "salafi" },
  { title: "🙏 Tazkia", value: "tazkia" },
];

export default function Home() {
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const onClickBadge = (value: string) => {
    setSelectedBadges((prev) =>
      prev.includes(value)
        ? prev.filter((val) => val !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const posts = await getPosts();
      setLoading(false);
      setPosts(posts);
    };
    fetch();
  }, []);

  const filteredPosts =
    selectedBadges.length > 0
      ? posts.filter((post) => haveIntersection(post["tags"], selectedBadges))
      : posts;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl space-y-4">
        <Input className="text-5xl" type="search" placeholder="Search" />
        <div className="flex w-full overflow-auto space-x-2 pb-2">
          {badges.map((badge) => (
            <Badge
              key={badge.value}
              onClick={() => onClickBadge(badge.value)}
              variant={
                selectedBadges.includes(badge.value) ? "default" : "outline"
              }
              className="cursor-pointer"
            >
              {badge.title}
            </Badge>
          ))}
        </div>
        {loading && (
          <div className="flex space-x-4">
            {Array(5)
              .fill(0)
              .map((a, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))}
          </div>
        )}
        {filteredPosts.map((post, index) => {
          return (
            <div key={`${post.id}-${index}`}>
              <Card className="w-lg max-h-[372px]">
                <CardHeader>
                  <div className="flex space-x-2">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {post["title"]}
                    </h4>
                    <p className="text-sm pt-1 text-muted-foreground">
                      {formatElapsedDate(post["publishedAt"].toString())}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="relative overflow-hidden">
                  <div className="rounded border p-4 h-64">
                    {<PortableText value={post["body"]} />}
                  </div>
                  {post["tags"] && (
                    <div className="absolute pt-3 overflow-auto bottom-0 bg-gradient-to-r from-gray-500/20 to-gray-700/20 text-white text-sm px-3 py-1 w-115.5 backdrop-blur-md border border-white/10  h-14 rounded">
                      <div className="flex space-x-2">
                        {post["tags"].map((tag) => (
                          <Badge key={tag} variant={"secondary"}>
                            {badges.find((badge) => badge.value === tag)?.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Come to our Discord Server
        </a>
      </footer>
    </div>
  );
}
