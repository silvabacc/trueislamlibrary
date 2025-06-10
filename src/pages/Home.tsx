import { Container, Grid } from "@mantine/core";
import { CardGradient } from "../components/CardGradient";

export default function Home() {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col>
          {
            <CardGradient
              title={"Theme"}
              description="       Extend default theme with any amount of additional colors, replace
        shadows, radius, spacing, fonts and many other properties to match your
        design requirements. Mantine theme is just an object, you can subscribe
        to it in any part of application via context and use it to build your
        own components."
            />
          }
        </Grid.Col>
      </Grid>
    </Container>
  );
}
