import { PortableTextComponents } from "next-sanity";
import ReactPlayer from "react-player";
import UrlPreview from "./link-preview";

export const components: PortableTextComponents = {
  types: {
    youtube: ({ value }) => {
      const { url } = value;
      return (
        <div className="flex justify-center my-6">
          <div className="w-full max-w-2xl aspect-video rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-sm">
            <ReactPlayer url={url} width="100%" height="100%" controls />
          </div>
        </div>
      );
    },
    tiktok: ({ value }) => {
      const { url } = value;
      const match = url.match(/\/video\/(\d+)/);
      return (
        <div className="flex justify-center my-6">
          <div className="w-full max-w-2xl rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-sm">
            <blockquote
              className="tiktok-embed w-full h-full"
              data-video-id={match?.[1]}
              style={{ width: "100%", height: "100%" }}
            >
              <section></section>
            </blockquote>
            <script async src="https://www.tiktok.com/embed.js"></script>
          </div>
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold border-b border-gray-300 dark:border-gray-600 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-3 text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-1">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="my-4 text-[15px] leading-relaxed text-gray-800 dark:text-gray-200">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 p-4 border-l-4 border-gray-400 dark:border-gray-600 pl-4 text-gray-600 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-800 rounded">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-4 text-[15px] text-gray-800 dark:text-gray-200">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-4 text-[15px] text-gray-800 dark:text-gray-200">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => <li className="mb-1 leading-snug">{children}</li>,
  marks: {
    link: ({ value }) => <UrlPreview url={value.href} />,
  },
};
