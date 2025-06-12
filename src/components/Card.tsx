import { Card, Flex, Group, Image, Pill, Popover, Text } from "@mantine/core";
import classes from "./Card.module.css";
import { useEffect, useRef, useState } from "react";
import { urlFor } from "../client";
import type { ImageDataType } from "../types";
import { badges } from "../utils";

type CardProps = {
  title: string;
  imageUrl?: ImageDataType;
  tags?: string[];
};
export function ArticleCard({ title, imageUrl, tags }: CardProps) {
  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          {...(imageUrl !== undefined && { src: urlFor(imageUrl).url() })}
          alt="Top 50 underrated plants for house decoration"
          height={180}
        />
      </Card.Section>
      <Text className={classes.title}>{title}</Text>
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
    <Flex gap={2} style={{ width: MAX_WIDTH }}>
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
              style={{ cursor: "pointer" }}
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
