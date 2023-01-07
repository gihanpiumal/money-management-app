import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/present_money/";

//Action Creators
export const getPresentMoney = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_present_money, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addPresentMoney = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "add", obj);
    dispatch({ type: actionTypes.add_present_money, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePresentMoney = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_present_money, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

