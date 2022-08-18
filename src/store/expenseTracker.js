import { createContext, useEffect, useReducer } from "react";
import transactionReducer from "./transactionReducer";
import data from "./data";
import { ADD_TRANSACTION, REMOVE_TRANSACTION } from "./constantActionType";

// Initial state
const initialState = {
  transaction: JSON.parse(localStorage.getItem("transaction"))
    ? JSON.parse(localStorage.getItem("transaction")).transaction.map(
        (curElemts) => {
          return {
            ...curElemts,
            date: new Date(curElemts.date),
          };
        }
      )
    : data,
};

//  Create context
const ExpenseTracker = createContext({
  initialState,
});

// Provider component
export const ExpenseTrackerProvider = ({ children }) => {
  const [allTransaction, dispatch] = useReducer(
    transactionReducer,
    initialState
  );

  //   Actions
  const removeTransaction = (id) => {
    dispatch({
      type: REMOVE_TRANSACTION,
      payload: id,
    });
  };

  const addTransaction = (transaction) => {
    dispatch({
      type: ADD_TRANSACTION,
      payload: transaction,
    });
  };

  // store data in localstorage
  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(allTransaction));
    // eslint-disable-next-line
  }, [allTransaction.transaction]);

  //   Calculate amount
  let income = 0;
  let expense = 0;

  allTransaction.transaction.map((curElem) => {
    return curElem.type === "Income"
      ? (income = income + curElem.amount)
      : (expense = expense + curElem.amount);
  });

  return (
    <ExpenseTracker.Provider
      value={{
        transaction: allTransaction.transaction,
        addTransaction,
        removeTransaction,
        income,
        expense,
      }}
    >
      {children}
    </ExpenseTracker.Provider>
  );
};

export default ExpenseTracker;
