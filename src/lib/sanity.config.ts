import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../../schemaTypes";
import { getConfig } from "./config";

export default async function sanityConfig() {
  const { projectId, dataset } = await getConfig();

  return defineConfig({
    name: "default",
    title: "trueserver",

    projectId: projectId,
    dataset: dataset,
    basePath: "/studio",

    plugins: [structureTool(), visionTool()],

    schema: {
      types: schemaTypes,
    },
  });
}
