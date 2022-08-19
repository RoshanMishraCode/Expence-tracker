import React, { useContext, useState } from "react";
import Container from "../UI/Container";
import TransactionList from "./TransactionList";
import { flexUi } from "../UI/Container";
import ExpenseTracker from "../../store/expenseTracker";

const Transaction = () => {
  // useContext call
  const { transaction, removeTransaction } = useContext(ExpenseTracker);

  //   search input field start
  const [searchData, setSearchData] = useState("");
  const onChangeHandlear = (e) => {
    const date = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchData(date.trim().length !== 0 ? date : "");
  };

  const filteredItem = transaction.filter(
    (item) =>
      item.title.includes(searchData) ||
      item.title.includes(searchData.toLowerCase()) ||
      item.amount.toString().includes(searchData) ||
      item.title.includes(searchData.toUpperCase()) ||
      item.title.includes(
        searchData.charAt(0).toUpperCase() + searchData.slice(1).toLowerCase()
      ) ||
      item.type.includes(
        searchData.charAt(0).toUpperCase() + searchData.slice(1).toLowerCase()
      )
  );
  // search input field end

  const mapTransactionList = filteredItem.map((curElem) => {
    return (
      <TransactionList
        key={curElem.id}
        curElem={curElem}
        removeTransaction={removeTransaction}
      />
    );
  });

  return (
    <Container>
      <h4 className="mx-sm-5 mx-2">Transaction</h4>
      <hr />
      <form className={`${flexUi} py-2`} role="search">
        <input
          className="form-control w-50"
          type="search"
          value={searchData}
          onChange={onChangeHandlear}
          placeholder="Search by name, amount and type..."
          aria-label="Search"
        />
      </form>
      {mapTransactionList}
    </Container>
  );
};

export default Transaction;
