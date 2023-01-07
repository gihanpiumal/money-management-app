import actionTypes from "../actions/actionTypes";

export default (yearPlans = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_year_plans:
      return action.payload;
    case actionTypes.add_year_plan:
      return [...yearPlans, action.payload];
    case actionTypes.update_year_plan:
      return yearPlans.map((yearPlan) =>
        yearPlan._id === action.payload._id ? action.payload : yearPlan
      );
    case actionTypes.delete_year_plan:
      return yearPlans.filter((yearPlan) => yearPlan._id !== action.payload);
    default:
      return yearPlans;
  }
};
