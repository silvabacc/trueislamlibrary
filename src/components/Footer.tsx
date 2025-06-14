import {
  IconBrandDiscord,
  IconBrandTiktok,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Container, Group, Text } from "@mantine/core";
import classes from "./Footer.module.css";
import { Link } from "react-router";

export function FooterSocial() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text fw={800}>True Islam Library</Text>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link to={import.meta.env.VITE_TIKTOK} target="_blank">
              <IconBrandTiktok size={18} stroke={1.5} />
            </Link>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link to={import.meta.env.VITE_YOUTUBE} target="_blank">
              <IconBrandYoutube size={18} stroke={1.5} />
            </Link>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link to={import.meta.env.VITE_DISCORD} target="_blank">
              <IconBrandDiscord size={18} stroke={1.5} />
            </Link>
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
