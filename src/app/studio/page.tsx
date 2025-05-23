"use client";

import { NextStudio } from "next-sanity/studio";
import sanityConfig from "@/lib/sanity.config";
import { useEffect, useState } from "react";

export default function Studio() {
  const [config, setConfig] = useState<any>();

  useEffect(() => {
    const getConfig = async () => {
      const config = await sanityConfig();
      setConfig(config);
    };
    getConfig();
  }, []);

  return <NextStudio config={config} />;
}
