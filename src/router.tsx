import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useEffect, type ReactNode } from "react";
import { createBrowserRouter, useNavigation } from "react-router";
import { HeaderSearch } from "./HeaderSearch";

type ElementProps = {
  children?: ReactNode;
};
const Element = ({ children }: ElementProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [navigation.state]);

  return (
    <>
      <HeaderSearch />
      <NavigationProgress />
      {children}
    </>
  );
};

export const routes = [
  {
    path: "/",
    title: "Home",
    element: <Element children={<div>Home</div>} />,
  },
  {
    path: "/library",
    title: "Library",
    element: <Element children={<div>Library</div>} />,
  },
];

export const router = createBrowserRouter([...routes]);
