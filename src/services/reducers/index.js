import { combineReducers } from "redux";

import expences from "./expenciveReducers";
import incomes from "./incomeReducers";

export default combineReducers({
  EXPENCES: expences,
  INCOMES: incomes,
});
