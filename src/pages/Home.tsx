import {
  Autocomplete,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Pill,
  Text,
} from "@mantine/core";
import { CardGradient } from "../components/CardGradient";
import { IconSearch } from "@tabler/icons-react";

const badges = [
  { title: "🕋 Islam", value: "islam" },
  { title: "✅ Proofs", value: "proofs" },
  { title: "📖 Quran", value: "quran" },
  { title: "🌕 New to Islam", value: "new to islam" },
  { title: "💞 Marriage", value: "marriage" },
  { title: "🫂 Adab", value: "adab" },
  { title: "⛓️ Slavery", value: "slavery" },
  { title: "📿 Tawassul", value: "tawassul" },
  { title: "☝️ Aqeeda", value: "aqeeda" },
  // { title: "🌙 Islambackup", value: "islambackup" },
  { title: "🛡️ Defense", value: "defense" },
  { title: "🌹 Aisha RA", value: "aishara" },
  { title: "❤️ Prophet Muhammad ﷺ", value: "rasulallah" },
  { title: "⛪️ Christianity", value: "christianity" },
  { title: "⚛️ Atheism", value: "atheism" },
  // { title: "8thmane", value: "8thmane" },
  { title: "📚 Library", value: "library" },
  { title: "🗣️ Debate", value: "debate" },
  { title: "🏴 Salafi", value: "salafi" },
  { title: "🙏 Tazkia", value: "tazkia" },
];

export default function Home() {
  return (
    <Container>
      <Grid>
        <Grid.Col span={3}>
          <h1>Articles from our library</h1>
          <p>
            Your source for authentic Islamic articles, insights, and
            understanding.
          </p>
        </Grid.Col>
        <Grid.Col span={3}>
          <CardGradient
            title="An example of an article title"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <CardGradient
            title="An example of an article title"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <CardGradient
            title="An example of an article title"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Grid.Col>
      </Grid>
      <Divider my="lg" />
      <Text size="sm" mt="sm" c="dimmed">
        Filters
      </Text>
      <Flex align={"center"}>
        <Group flex={4} my="sm">
          {badges.map((badge) => (
            <Pill key={badge.value} size="xs">
              {badge.title}
            </Pill>
          ))}
        </Group>
        <Autocomplete
          flex={2}
          placeholder="Search"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          visibleFrom="xs"
        />
      </Flex>
      <Text size="sm" mt="sm" c="dimmed">
        Trending
      </Text>
    </Container>
  );
}
