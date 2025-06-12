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
  tags: string[];
  _id: string;
};
