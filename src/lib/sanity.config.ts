import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../../schemaTypes";
import { getConfig } from "./config";
import { markdownSchema } from "sanity-plugin-markdown";

export default async function sanityConfig() {
  const { projectId, dataset } = await getConfig();

  return defineConfig({
    name: "default",
    title: "trueserver",

    projectId: projectId,
    dataset: dataset,
    basePath: "/studio",

    plugins: [structureTool(), visionTool(), markdownSchema()],

    schema: {
      types: schemaTypes,
    },
  });
}
