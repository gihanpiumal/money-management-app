import actionTypes from "../actions/actionTypes";

export default (presentMoney = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_present_money:
      return action.payload;
    case actionTypes.update_present_money:
      return presentMoney.map((money) =>
        money._id === action.payload._id ? action.payload : money
      );
    default:
      return presentMoney;
  }
};
