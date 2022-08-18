import React, { useContext } from "react";
import ExpenseTracker from "../../store/expenseTracker";
import Container from "../UI/Container";

const Overview = () => {
  const { income, expense } = useContext(ExpenseTracker);

  return (
    <Container>
      <div className="row row-cols-2 g-2">
        <div className="col">
          <div className="p-2 border bg-light shadow rounded">
            <h6>Expense</h6>
            <div className="text-danger fs-4 fw-bold">₹&nbsp;{expense}</div>
          </div>
        </div>
        <div className="col">
          <div className="p-2 border bg-light shadow rounded">
            <h6>Income</h6>
            <div className="text-success fs-4 fw-bold">₹&nbsp;{income}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
