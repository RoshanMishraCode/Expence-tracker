import React from "react";
import Container from "../UI/Container";
import AddTransaction from "./AddTransaction";
import Overview from "./Overview";

const Home = () => {
  return (
    <Container>
      <AddTransaction />
      <Overview />
    </Container>
  );
};

export default Home;
