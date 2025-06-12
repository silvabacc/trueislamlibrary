import { Paper, Text } from "@mantine/core";
import classes from "./CardGradient.module.css";

type CardGradientProps = {
  title: string;
  description: string;
};
export function CardGradient({ title, description }: CardGradientProps) {
  return (
    <Paper h={240} withBorder radius="md" className={classes.card}>
      <Text size="xl" fw={500} mt="md">
        {title}
      </Text>
      <Text size="sm" mt="sm" c="dimmed" lineClamp={4}>
        {description}
      </Text>
    </Paper>
  );
}
