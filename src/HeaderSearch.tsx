import { IconSearch } from "@tabler/icons-react";
import { Autocomplete, Burger, Flex, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderSearch.module.css";
import TrueIslamLibraryIcon from "./assets/trueislam.webp";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Group>
            <img
              className={classes.icon}
              width={40}
              src={TrueIslamLibraryIcon}
            />
            <Flex visibleFrom="md">
              <h2>True Islam Library</h2>
            </Flex>
          </Group>
          <Menu opened={opened} shadow="md" width={200}>
            <Menu.Target>
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                hiddenFrom="sm"
              />
            </Menu.Target>
            <Menu.Dropdown className={classes.burger}>
              {links.map((link, index) => (
                <div key={`${link.label}-${index}`}>
                  <Menu.Item onClick={toggle}>{link.label}</Menu.Item>
                </div>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}
