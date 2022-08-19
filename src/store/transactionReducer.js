import {
  ADD_DB_DATA,
  ADD_TRANSACTION,
  LOCAL_STORAGE_DATA,
  REMOVE_TRANSACTION,
} from "./constantActionType";

const transactionReducer = (state, action) => {
  switch (action.type) {
    case REMOVE_TRANSACTION:
      return {
        ...state,
        transaction: state.transaction.filter(
          (tran) => tran.id !== action.payload
        ),
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        transaction: [action.payload, ...state.transaction],
      };
    case LOCAL_STORAGE_DATA:
      return {
        ...state,
        transaction: action.payload.map((curElemts) => {
          return {
            ...curElemts,
            date: new Date(curElemts.date),
          };
        }),
      };
    case ADD_DB_DATA:
      return {
        ...state,
        transaction: action.payload,
      };

    default:
      return state;
  }
};

export default transactionReducer;
