import { ADD_TRANSACTION, REMOVE_TRANSACTION } from "./constantActionType";

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

    default:
      return state;
  }
};

export default transactionReducer;
