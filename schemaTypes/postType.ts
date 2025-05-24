import { defineField, defineType, defineArrayMember } from "sanity";

import { PlayIcon } from "@sanity/icons";
import { YouTubePreview } from "./youTubePreview";
import { tiktokPreview } from "./tiktokPreview";

export const tiktok = defineType({
  name: "tiktok",
  type: "object",
  title: "TikTok Embed",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "TikTok Video URL",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"], allowRelative: false }).required(),
    }),
  ],
  preview: {
    select: { title: "url" },
  },
  components: {
    preview: tiktokPreview,
  },
});

export const youtube = defineType({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube video URL",
    }),
  ],
  preview: {
    select: { title: "url" },
  },
  components: {
    preview: YouTubePreview,
  },
});

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          { title: "8thmane", value: "8thmane" },
          { title: "Adab", value: "adab" },
          { title: "Aisha RA", value: "aishara" },
          { title: "Aqeeda", value: "aqeeda" },
          { title: "Atheism", value: "atheism" },
          { title: "Christianity", value: "christianity" },
          { title: "Debate", value: "debate" },
          { title: "Defense", value: "defense" },
          { title: "Islam", value: "islam" },
          { title: "Islambackup", value: "islambackup" },
          { title: "Library", value: "library" },
          { title: "Marriage", value: "marriage" },
          { title: "New to Islam", value: "new to islam" },
          { title: "Proofs", value: "proofs" },
          { title: "Prophet Muhammad ﷺ", value: "rasulallah" },
          { title: "Quran", value: "quran" },
          { title: "Salafi", value: "salafi" },
          { title: "Slavery", value: "slavery" },
          { title: "Tawassul", value: "tawassul" },
          { title: "Tazkia", value: "tazkia" },
        ],
      },
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
        defineArrayMember({
          type: "youtube",
        }),
        defineArrayMember({ type: "tiktok" }),
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
        defineArrayMember({
          type: "object",
          name: "authorBlock",
          title: "Author",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Author Name",
            },
          ],
        }),
      ],
    }),
  ],
});
