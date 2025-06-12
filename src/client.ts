import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageDataType } from "./types";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_PROJECT_ID || "",
  dataset: import.meta.env.VITE_DATASET || "",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: ImageDataType) {
  return builder.image(source);
}
