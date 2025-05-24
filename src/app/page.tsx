"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import { getPosts } from "./actions";
import { formatElapsedDate, haveIntersection } from "@/lib/utils";
import { SkeletonCard } from "@/components/ui/skeleton.card";
import { useRouter } from "next/navigation";
import NoData from "@/components/common/no-data";
import MarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");

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

  const filteredBadgesPosts =
    selectedBadges.length > 0
      ? posts.filter((post) => haveIntersection(post["tags"], selectedBadges))
      : posts;

  const filteredPosts = filteredBadgesPosts.filter((p) =>
    p["title"].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full max-w-7xl mx-auto px-4 space-y-4">
        <Input
          type="search"
          placeholder="Search"
          onChange={(v) => setSearch(v.currentTarget.value)}
        />
        <div className="flex w-full overflow-auto space-x-2 pb-2">
          {badges.map((badge) => (
            <Badge
              key={badge.value}
              onClick={() => onClickBadge(badge.value)}
              variant={
                selectedBadges.includes(badge.value) ? "default" : "outline"
              }
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-primary/40"
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
        {posts.length !== 0 && filteredPosts.length === 0 && <NoData />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
          {filteredPosts.map((post, index) => {
            return (
              <div key={`${post.id}-${index}`}>
                <Card
                  className="w-full max-h-[372px] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                  onClick={() => router.push(`/post/${post["slug"].current}`)}
                >
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
                    <div className="rounded border p-4">
                      <MarkDown remarkPlugins={[remarkGfm]}>
                        {post["markdown"]}
                      </MarkDown>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {post["tags"] && (
                      <div className="pt-3 overflow-auto bottom-0 bg-gradient-to-r from-gray-500/20 to-gray-700/20 text-white text-sm px-3 py-1 w-115.5 backdrop-blur-md border border-white/10  h-14 rounded">
                        <div className="flex space-x-2">
                          {(post["tags"] as string[]).map((tag) => (
                            <Badge key={tag} variant={"secondary"}>
                              {
                                badges.find((badge) => badge.value === tag)
                                  ?.title
                              }
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
