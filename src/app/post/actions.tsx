"use server";

import { client } from "@/lib/client";

const query = `*[_type == "post" && slug.current == $slug][0]`;

export const fetchPost = async (slug: string) => {
  const post = await client.fetch(query, { slug: slug });
  return post;
};
