import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/month_expence/";

//Action Creators
export const getMonthExpences = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_expences, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addMonthExpence = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "add", obj);
    dispatch({ type: actionTypes.add_expence, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMonthExpence = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_expence, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMonthExpence = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);

    dispatch({ type: actionTypes.delete_expence, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
