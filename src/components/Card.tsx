import { Card, Flex, Group, Popover, Text } from "@mantine/core";
import classes from "./Card.module.css";
import { useEffect, useRef, useState } from "react";
import type { PortableTextDocument } from "../types";
import { badges } from "../utils";
import Pill from "./Pill";
import PortableText from "react-portable-text";

type CardProps = {
  title: string;
  body: PortableTextDocument;
  tags?: string[];
  onClick?: () => void;
};
export function ArticleCard({ title, body, tags, onClick }: CardProps) {
  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className={classes.card}
      onClick={onClick}
    >
      <Text className={classes.title}>{title}</Text>
      <Text fz="sm" c="dimmed" lineClamp={6}>
        <PortableText
          content={body}
          serializers={{
            h1: ({ children }) => <h1 style={{ fontSize: 16 }}>{children}</h1>,
            h2: ({ children }) => <h2 style={{ fontSize: 14 }}>{children}</h2>,
            h3: ({ children }) => <h3 style={{ fontSize: 12 }}>{children}</h3>,
            h4: ({ children }) => <h4 style={{ fontSize: 10 }}>{children}</h4>,
          }}
        />
      </Text>
      <Card.Section className={classes.footer}>
        <Group gap={4}>
          <CardPills pills={badges.filter((b) => tags?.includes(b.value))} />
        </Group>
      </Card.Section>
    </Card>
  );
}

type CardPillsProps = {
  pills: { title: string; value: string }[];
};

export function CardPills({ pills }: CardPillsProps) {
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(pills.length);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const MAX_WIDTH = 220;

  useEffect(() => {
    let total = 0;
    let count = 0;
    const moreWidth = moreRef.current?.offsetWidth || 0;

    for (let i = 0; i < pills.length; i++) {
      const el = pillRefs.current[i];
      if (!el) continue;

      const width = el.offsetWidth;
      const isLastVisible = count === pills.length - 1;
      const willOverflow =
        total + width + (isLastVisible ? 0 : moreWidth) > MAX_WIDTH;

      if (willOverflow) break;

      total += width;
      count++;
    }

    setVisibleCount(count);
  }, [pills]);

  const hiddenPills = pills.slice(visibleCount);
  const hiddenCount = hiddenPills.length;

  return (
    <Flex gap={2} w={MAX_WIDTH}>
      {pills.slice(0, visibleCount).map((pill, index) => (
        <div key={pill.title} ref={(el) => (pillRefs.current[index] = el)}>
          <Pill size="xs">{pill.title}</Pill>
        </div>
      ))}

      {hiddenCount > 0 && (
        <Popover
          width="auto"
          position="bottom-start"
          withArrow
          shadow="md"
          opened={popoverOpened}
          onChange={setPopoverOpened}
        >
          <Popover.Target>
            <div
              ref={moreRef}
              onMouseEnter={() => setPopoverOpened(true)}
              onMouseLeave={() => setPopoverOpened(false)}
            >
              <Pill size="xs">+{hiddenCount} more</Pill>
            </div>
          </Popover.Target>
          <Popover.Dropdown onMouseLeave={() => setPopoverOpened(false)}>
            <Flex direction="column" gap={4}>
              {hiddenPills.map((pill) => (
                <Pill size="xs" key={pill.title}>
                  {pill.title}
                </Pill>
              ))}
            </Flex>
          </Popover.Dropdown>
        </Popover>
      )}
    </Flex>
  );
}
