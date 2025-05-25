// components/UrlPreview.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getMetaData, MetaData } from "./actions";
import { Skeleton } from "../ui/skeleton";

type UrlPreviewProps = {
  url: string;
};

export default function UrlPreview({ url }: UrlPreviewProps) {
  const [data, setData] = useState<MetaData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreview() {
      const preview = await getMetaData(url);
      setData(preview);
      setLoading(false);
    }

    fetchPreview();
  }, [url]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-xl p-4 shadow hover:shadow-md transition"
    >
      {loading && <Skeleton className="w-full h-48" />}
      {data?.images && data.images[0] && (
        <img
          src={data?.images[0]}
          alt="preview"
          className="w-full h-48 object-cover rounded mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{data?.title}</h3>
      <p className="">{data?.description}</p>
      <p className="text-xs text-blue-500 mt-2 text-xs text-blue-500 mt-2 break-words overflow-hidden">
        {url}
      </p>
    </a>
  );
}
