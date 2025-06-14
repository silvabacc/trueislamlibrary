import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";

import { AppShell, createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { headerRoutes } from "./router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./pages/Library";
import Post from "./pages/Post";
import StudioRoute from "./pages/Studio";
import { Header } from "./Header";
import { FooterSocial } from "./components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";

const primaryColor = "#317B42";
const queryClient = new QueryClient();

function App() {
  const theme = createTheme({
    primaryColor: "primary",
    colors: {
      primary: [
        "#ebffef",
        "#d4fede",
        "#a3fdb8",
        "#71fe8f",
        "#4dfd6e",
        "#3bfe59",
        `${primaryColor}`,
        "#034a14",
        `${primaryColor}`,
        "#034a14",
      ],
    },
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          <BrowserRouter>
            <ScrollToTop />
            <Content />
            <FooterSocial />
          </BrowserRouter>
        </AnimatePresence>
      </QueryClientProvider>
    </MantineProvider>
  );
}

const Content = () => {
  const location = useLocation();
  return (
    <AppShell header={{ height: 56 }} footer={{ height: 56 }} pt="md" pb="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Routes location={location} key={location.pathname}>
          {headerRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="/studio" element={<StudioRoute />} />
          <Route path="/post" element={Home} />
          <Route path="/post/:slug" element={<Post />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
