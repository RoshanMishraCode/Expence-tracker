import { createContext, useEffect, useReducer } from "react";
import transactionReducer from "./transactionReducer";
import data from "./data";
import {
  ADD_DB_DATA,
  ADD_TRANSACTION,
  LOCAL_STORAGE_DATA,
  REMOVE_TRANSACTION,
} from "./constantActionType";

// Initial state
const initialState = {
  transaction: [],
  income: 0,
  expense: 0,
};

// Create context
const ExpenseTracker = createContext({
  initialState,
});

// Provider component
export const ExpenseTrackerProvider = ({ children }) => {
  const [allTransaction, dispatch] = useReducer(
    transactionReducer,
    initialState
  );

  // Actions
  const removeTransaction = (id) => {
    const newTransactions = allTransaction.transaction.filter(
      (item) => item.id !== id
    );
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
    dispatch({
      type: REMOVE_TRANSACTION,
      payload: id,
    });
  };

  const addTransaction = (transaction) => {
    const newTransactions = [transaction, ...allTransaction.transaction];
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
    dispatch({
      type: ADD_TRANSACTION,
      payload: transaction,
    });
  };

  const addLocalStorageData = (localStorageTransactions) => {
    dispatch({
      type: LOCAL_STORAGE_DATA,
      payload: localStorageTransactions,
    });
  };
  const addApiData = (apiData) => {
    dispatch({
      type: ADD_DB_DATA,
      payload: apiData,
    });
  };

  // store data in localstorage
  useEffect(() => {
    const localStorageTransactions = JSON.parse(
      localStorage.getItem("transactions")
    );
    if (localStorageTransactions) {
      addLocalStorageData(localStorageTransactions);
    } else {
      addApiData(data);
    }
  }, []);

  return (
    <ExpenseTracker.Provider
      value={{
        transaction: allTransaction.transaction,
        addTransaction,
        removeTransaction,
        income: allTransaction.income,
        expense: allTransaction.expense,
      }}
    >
      {children}
    </ExpenseTracker.Provider>
  );
};

export default ExpenseTracker;
