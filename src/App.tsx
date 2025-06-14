import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";

import { AppShell, createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router";
import { headerRoutes } from "./router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./pages/Home";
import Post from "./pages/Post";
import StudioRoute from "./pages/Studio";
import Layout from "./layout/Layout";
import { Header } from "./Header";
import { FooterSocial } from "./components/Footer";

const primaryColor = "#005013";
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
        <BrowserRouter>
          <AppShell
            header={{ height: 56 }}
            footer={{ height: 56 }}
            pt="md"
            pb="md"
          >
            <AppShell.Header>
              <Header />
            </AppShell.Header>
            <AppShell.Main>
              <Routes>
                {headerRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                <Route path="/studio" element={<StudioRoute />} />
                <Route path="/post" element={<Home />} />
                <Route path="/post/:slug" element={<Post />} />
              </Routes>
            </AppShell.Main>
          </AppShell>
          <FooterSocial />
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
