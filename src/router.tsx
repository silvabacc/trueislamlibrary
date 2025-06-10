import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useEffect, type ReactNode } from "react";
import { createBrowserRouter, useNavigation } from "react-router";
import { HeaderSearch } from "./HeaderSearch";
import Home from "./pages/Home";

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
    element: <Element children={<Home />} />,
  },
  {
    path: "/library",
    title: "Library",
    element: <Element children={<div>Library</div>} />,
  },
  {
    path: "/videos",
    title: "Videos",
    element: <Element children={<div>Videos</div>} />,
  },
];

export const router = createBrowserRouter([...routes]);
