import {
  ADD_DB_DATA,
  ADD_TRANSACTION,
  LOCAL_STORAGE_DATA,
  REMOVE_TRANSACTION,
} from "./constantActionType";

const transactionReducer = (state, action) => {
  switch (action.type) {
    case REMOVE_TRANSACTION:
      let incomeRemove = state.income;
      let expenseRemove = state.expense;
      const removeItemId = state.transaction.find(
        (item) => item.id === action.payload
      );
      if (removeItemId.type === "Income") {
        incomeRemove = state.income - removeItemId.amount;
      } else {
        expenseRemove = state.expense - removeItemId.amount;
      }
      const removeTransaction = state.transaction.filter(
        (tran) => tran.id !== action.payload
      );
      localStorage.setItem(
        "incomeExpense",
        JSON.stringify({ income: incomeRemove, expense: expenseRemove })
      );

      return {
        ...state,
        transaction: removeTransaction,
        income: incomeRemove,
        expense: expenseRemove,
      };

    case ADD_TRANSACTION:
      let incomeAdd = state.income;
      let expenseAdd = state.expense;
      if (action.payload.type === "Income") {
        incomeAdd = state.income + action.payload.amount;
      } else {
        expenseAdd = state.expense + action.payload.amount;
      }
      localStorage.setItem(
        "incomeExpense",
        JSON.stringify({ income: incomeAdd, expense: expenseAdd })
      );

      return {
        ...state,
        transaction: [action.payload, ...state.transaction],
        income: incomeAdd,
        expense: expenseAdd,
      };
    case LOCAL_STORAGE_DATA:
      const localStorageIncomeExpense = JSON.parse(
        localStorage.getItem("incomeExpense")
      );

      return {
        ...state,
        transaction: action.payload.map((curElemts) => {
          return {
            ...curElemts,
            date: new Date(curElemts.date),
          };
        }),
        income: localStorageIncomeExpense.income,
        expense: localStorageIncomeExpense.expense,
      };
    case ADD_DB_DATA:
      let income = 0;
      let expense = 0;

      action.payload.map((curElem) => {
        return curElem.type === "Income"
          ? (income = income + curElem.amount)
          : (expense = expense + curElem.amount);
      });

      return {
        ...state,
        transaction: action.payload,
        income: income,
        expense: expense,
      };

    default:
      return state;
  }
};

export default transactionReducer;
