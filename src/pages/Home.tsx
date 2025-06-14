import { Container, Flex, Text } from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import classes from "./Home.module.css";

function Home() {
  return (
    <Container className={classes.container} size={"sm"} py={24}>
      <Flex align={"center"} direction={"column"}>
        <h1>True Islam Library</h1>
        {/* <img height={60} src={Bis} /> */}
      </Flex>
    </Container>
  );
}

export default PageTransition(Home);
