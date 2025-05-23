import { defineCliConfig } from "sanity/cli";
import { getConfig } from "./config";

const { projectId, dataset } = getConfig();

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
});
