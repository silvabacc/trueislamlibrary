import {
  Box,
  Burger,
  Button,
  Container,
  Flex,
  Group,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import TrueIslamLibraryIcon from "./assets/trueislam.webp";
import { headerRoutes, routes } from "./router";
import { NavLink } from "react-router";

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = headerRoutes.map((route) => (
    <NavLink key={route.title} to={route.path} className={classes.link}>
      {route.title}
    </NavLink>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Flex align={"center"}>
          <Menu opened={opened} shadow="md" width={200}>
            <Menu.Target>
              <Burger
                mr={8}
                opened={opened}
                onClick={toggle}
                size="sm"
                hiddenFrom="sm"
              />
            </Menu.Target>
            <Menu.Dropdown className={classes.burger}>
              {[...headerRoutes, ...routes].map((route, index) => (
                <div key={`${route.title}-${index}`}>
                  <NavLink to={route.path}>
                    <Menu.Item onClick={toggle}>{route.title}</Menu.Item>
                  </NavLink>
                </div>
              ))}
            </Menu.Dropdown>
          </Menu>
          <img className={classes.icon} width={40} src={TrueIslamLibraryIcon} />
        </Flex>
        <Group visibleFrom="sm">
          <Group ml={50} gap={5} className={classes.links}>
            {items}
          </Group>
        </Group>
        <NavLink to={"/studio"}>
          <Button>Studio</Button>
        </NavLink>
      </div>
    </header>
  );
}
