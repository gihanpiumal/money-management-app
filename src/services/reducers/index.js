import { combineReducers } from "redux";

import expences from "./expenciveReducers";
import incomes from "./incomeReducers";
import yearPlans from "./yearPlanReducers";
import presentMoney from "./presentMoneyReducers";

export default combineReducers({
  EXPENCES: expences,
  INCOMES: incomes,
  YEAR_PLANS: yearPlans,
  PRESENT_MONEY: presentMoney,
});
