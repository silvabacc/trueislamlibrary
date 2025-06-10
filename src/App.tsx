import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { HeaderSearch } from "./HeaderSearch";

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
        "#005013",
        "#28e23f",
        "#1dc936",
        "#005013",
      ],
    },
  });

  return (
    <MantineProvider theme={theme}>
      <NavigationProgress />
      <HeaderSearch />
    </MantineProvider>
  );
}

export default App;
