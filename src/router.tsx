import Home from "./pages/Home";
import Library from "./pages/Library";

export const headerRoutes = [
  {
    path: "/",
    title: "Home",
    element: <Home />,
  },
  {
    path: "/library",
    title: "Library",
    element: Library,
  },
  {
    path: "/videos",
    title: "Videos",
    element: <div>Videos</div>,
  },
  {
    path: "/about",
    title: "About",
    element: <div>About</div>,
  },
];
