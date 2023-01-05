import actionTypes from "../actions/actionTypes";

export default (expences = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_expences:
      return action.payload;
    case actionTypes.add_expence:
      return [...expences, action.payload];
    case actionTypes.update_expence:
      return expences.map((expence) =>
        expence._id === action.payload._id ? action.payload : expence
      );
    case actionTypes.delete_expence:
      return expences.filter((expence) => expence._id !== action.payload);
    default:
      return expences;
  }
};
