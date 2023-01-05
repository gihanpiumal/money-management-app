import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/month_income/";

//Action Creators
export const getMonthIncomes = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_incomes, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addMonthIncome = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "add", obj);
    dispatch({ type: actionTypes.add_income, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMonthIncome = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_income, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMonthIncome = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);

    dispatch({ type: actionTypes.delete_income, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
