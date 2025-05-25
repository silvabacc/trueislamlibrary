"use server";

import { getLinkPreview } from "link-preview-js";

export type MetaData = {
  images: string[];
  title: string;
  description: string;
};

export const getMetaData = async (url: string) => {
  const preview = await getLinkPreview(url);

  const title =
    "title" in preview && typeof preview.title === "string"
      ? preview.title
      : "";
  const description =
    "description" in preview && typeof preview.description === "string"
      ? preview.description
      : "";
  const images =
    "images" in preview && Array.isArray(preview.images) ? preview.images : [];

  return { title, description, images };
};
