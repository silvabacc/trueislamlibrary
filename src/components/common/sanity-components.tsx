import { PortableTextComponents } from "next-sanity";
import ReactPlayer from "react-player";

export const components: PortableTextComponents = {
  types: {
    youtube: ({ value }) => {
      const { url } = value;
      return (
        <div className="flex justify-center">
          <div className="w-full max-w-2xl aspect-video rounded bg-background p-2">
            <ReactPlayer url={url} width="100%" height="100%" controls />
          </div>
        </div>
      );
    },
    tiktok: ({ value }) => {
      const { url } = value;
      const match = url.match(/\/video\/(\d+)/);
      return (
        <div className="flex justify-center">
          <div className="w-full max-w-2xl aspect-[9/16] rounded bg-background p-2">
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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    normal: ({ children }) => <p className="my-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-8">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-8">{children}</ol>
    ),
  },
  listItem: ({ children }) => <li className="relative py-1">{children} </li>,
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          className="text-blue-600 hover:text-blue-800 break-all"
          href={value.href}
          target="_blank"
          rel={rel}
        >
          {children}
        </a>
      );
    },
  },
};
