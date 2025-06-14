import Home from "./pages/Home";

export const headerRoutes = [
  {
    path: "/",
    title: "Home",
    element: <Home />,
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
