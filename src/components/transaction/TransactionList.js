import React from "react";
import Button from "../UI/Button";
import { felexUiBetween } from "../UI/Container";

const TransactionList = (props) => {
  const { curElem, removeTransaction } = props;
  const month = curElem.date.toLocaleString("en-US", { month: "long" });
  const year = curElem.date.getFullYear();
  const handleRowBg = curElem.type === "Income" ? "bg-white" : "expense-row";
  const handleType = curElem.type === "Income" ? "text-success" : "text-danger";

  return (
    <div className="row mb-2">
      <div
        className={`col shadow rounded pe-0 ${handleRowBg} mx-4 ${felexUiBetween}`}
      >
        <h6 className="text-capitalize">{curElem.title}</h6>
        <div>{`${month}-${year}`}</div>
        <div>₹&nbsp;{curElem.amount}</div>
        <div className={handleType}>{curElem.type}</div>
        <Button
          onClick={() => removeTransaction(curElem.id)}
          className="btn-outline-danger"
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default TransactionList;
