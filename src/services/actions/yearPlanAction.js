import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/year_plan/";

//Action Creators
export const getYearPlans = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_year_plans, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addYearPlan = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "add", obj);
    dispatch({ type: actionTypes.add_year_plan, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateYearPlan = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_year_plan, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteYearPlan = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);

    dispatch({ type: actionTypes.delete_year_plan, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
