import { defineField, defineType } from "sanity";

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
          { title: "Islam", value: "islam" },
          { title: "Proofs", value: "proofs" },
          { title: "Quran", value: "quran" },
          { title: "New to Islam", value: "new to islam" },
          { title: "Marriage", value: "marriage" },
          { title: "Adab", value: "adab" },
          { title: "Slavery", value: "slavery" },
          { title: "Tawassul", value: "tawassul" },
          { title: "Aqeeda", value: "aqeeda" },
          { title: "Islambackup", value: "islambackup" },
          { title: "Defense", value: "defense" },
          { title: "Aisha RA", value: "aishara" },
          { title: "Prophet Muhammad ﷺ", value: "rasulallah" },
          { title: "Christianity", value: "christianity" },
          { title: "Atheism", value: "atheism" },
          { title: "8thmane", value: "8thmane" },
          { title: "Library", value: "library" },
          { title: "Debate", value: "debate" },
          { title: "Salafi", value: "salafi" },
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
      name: "markdown",
      type: "markdown",
    }),
  ],
});
