import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
        "#00370d",
        "#1dc936",
        "#005013",
      ],
    },
  });

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
