import { defineConfig, Studio } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../schemaTypes";

const config = defineConfig({
  projectId: import.meta.env.VITE_PROJECT_ID || "",
  dataset: import.meta.env.VITE_DATASET || "",
  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
export default function StudioRoute() {
  return (
    <div style={{ height: "100vh" }}>
      <Studio config={config} />;
    </div>
  );
}
