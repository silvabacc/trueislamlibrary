export type ImageDataType = {
  asset: {
    _ref: string;
    _type: string;
  };
};

export type Post = {
  image: ImageDataType;
  publishedAt: string;
  slug: {
    current: string;
    _type: string;
  };
  title: string;
  body: PortableTextDocument;
  tags: string[];
  _id: string;
};

type PortableTextSpan = {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
};

type PortableTextMarkDef = {
  _key: string;
  _type: "link";
  href: string;
};

type PortableTextBlock = {
  _key: string;
  _type: "block";
  style: string;
  children: PortableTextSpan[];
  markDefs: PortableTextMarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
};

type PortableTextYouTube = {
  _key: string;
  _type: "youtube";
  url: string;
};

type PortableTextNode = PortableTextBlock | PortableTextYouTube;

export type PortableTextDocument = PortableTextNode[];
