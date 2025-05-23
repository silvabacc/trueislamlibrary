"use server";

export const getConfig = async () => ({
  projectId: process.env.PROJECT_ID || "",
  dataset: process.env.DATASET || "",
  apiVersion: process.env.API_VERSION || "",
  useCdn: process.env.USE_CDN === "true",
});
