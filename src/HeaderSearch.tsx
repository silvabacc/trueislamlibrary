import { IconSearch } from "@tabler/icons-react";
import { Autocomplete, Burger, Flex, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderSearch.module.css";
import TrueIslamLibraryIcon from "./assets/trueislam.webp";
import { routes } from "./router";
import { NavLink } from "react-router";

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = routes.map((route) => (
    <NavLink key={route.title} to={route.path} className={classes.link}>
      {route.title}
    </NavLink>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
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
              {routes.map((route, index) => (
                <div key={`${route.title}-${index}`}>
                  <Menu.Item onClick={toggle}>{route.title}</Menu.Item>
                </div>
              ))}
            </Menu.Dropdown>
          </Menu>
          <Group>
            <img
              className={classes.icon}
              width={40}
              src={TrueIslamLibraryIcon}
            />
            <Flex>
              <h2>True Islam Library</h2>
            </Flex>
          </Group>
        </Group>
        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            visibleFrom="xs"
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
          />
        </Group>
      </div>
    </header>
  );
}
