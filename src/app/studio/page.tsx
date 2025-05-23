"use client";

import { NextStudio } from "next-sanity/studio";
import sanityConfig from "@/lib/sanity.config";
import { useEffect, useState } from "react";
import { Config } from "sanity";

export default function Studio() {
  const [config, setConfig] = useState<Config>({} as Config);

  useEffect(() => {
    const getConfig = async () => {
      const config = await sanityConfig();
      setConfig(config);
    };
    getConfig();
  }, []);

  return <NextStudio config={config} />;
}
