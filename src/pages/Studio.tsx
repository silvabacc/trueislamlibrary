// StudioRoute.tsx
import { defineConfig, Studio } from "sanity";
const config = defineConfig({
  projectId: import.meta.env.VITE_PROJECT_ID || "",
  dataset: import.meta.env.VITE_DATASET || "",
  basePath: "/studio",
});
export default function StudioRoute() {
  return <Studio config={config} />;
}
