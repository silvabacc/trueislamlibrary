import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useEffect, type ReactNode } from "react";
import { createBrowserRouter, useNavigation } from "react-router";
import { HeaderSearch } from "./Header";
import Home from "./pages/Home";
import StudioRoute from "./pages/Studio";

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

export const headerRoutes = [
  {
    path: "/",
    title: "Home",
    element: <Element children={<Home />} />,
  },

  {
    path: "/videos",
    title: "Videos",
    element: <Element children={<div>Videos</div>} />,
  },
  {
    path: "/about",
    title: "About",
    element: <Element children={<div>About</div>} />,
  },
];

export const routes = [
  {
    path: "/studio",
    title: "Studio",
    element: <Element children={<StudioRoute />} />,
  },
  {
    path: "/studio/*",
    title: "Studio",
    element: <Element children={<StudioRoute />} />,
  },
];

export const router = createBrowserRouter([...headerRoutes, ...routes]);
