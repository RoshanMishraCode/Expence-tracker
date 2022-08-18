import React from "react";
import Home from "./components/home/Home";
import Transaction from "./components/transaction/Transaction";
import Container from "./components/UI/Container";

const App = () => {
  return (
    <Container>
      <h3 className="text-decoration-underline">Income-Expense Tracker</h3>
      <Home />
      <Transaction />
    </Container>
  );
};

export default App;
