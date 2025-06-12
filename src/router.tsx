import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useEffect, type ReactNode } from "react";
import { createBrowserRouter, useNavigation } from "react-router";
import { HeaderSearch } from "./Header";
import Library from "./pages/Library";

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
    title: "Library",
    element: <Element children={<Library />} />,
  },
  {
    path: "/videos",
    title: "Videos",
    element: <Element children={<div>Videos</div>} />,
  },
];

export const routes = [
  {
    path: "/studio",
    title: "Studio",
    element: <Element children={<div>Studio</div>} />,
  },
];

export const router = createBrowserRouter([...headerRoutes, ...routes]);
