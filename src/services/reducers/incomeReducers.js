import actionTypes from "../actions/actionTypes";

export default (incomes = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_incomes:
      return action.payload;
    case actionTypes.add_income:
      return [...incomes, action.payload];
    case actionTypes.update_income:
      return incomes.map((income) =>
        income._id === action.payload._id ? action.payload : income
      );
    case actionTypes.delete_income:
      return incomes.filter((income) => income._id !== action.payload);
    default:
      return incomes;
  }
};
