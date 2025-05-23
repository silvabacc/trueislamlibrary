"use server";

import { client } from "@/lib/client";
import { SanityDocument } from "next-sanity";

export const getPosts = async () => {
  const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{_id, tags, title, slug, publishedAt, markdown}`;

  const options = { next: { revalidate: 30 } };
  return await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
};
