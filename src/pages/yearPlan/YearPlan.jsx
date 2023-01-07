import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";

import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import { Input, Select, Modal, message } from "antd";

import "./yearplan.scss";

import { YearPlanCard } from "../../components";
import {
  getYearPlans,
  addYearPlan,
} from "../../services/actions/yearPlanAction";

const schema = Joi.object({
  plan_name: Joi.string().required().label("Plan Name"),
  expect_budget: Joi.number().required().label("Expect Budget"),
  saving_amount: Joi.number().required().label("Saving Amount"),
  remark: Joi.string().empty("").label("Remarks"),
});

const YearPlan = () => {
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({
    plan_name: "",
    expect_budget: 0,
    saving_amount: 0,
    remark: "",
  });
  const [errors, setErrors] = useState([]);
  const [filter, setFilter] = useState({
    plan_name: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getYearPlans(filter)); // load data to redux store
  }, [dispatch]);

  const dataUser = useSelector((state) => state.YEAR_PLANS);

  const handleCancelAddModal = () => {
    setAddModal(false);
    resetForm();
  };
  const handleAddModal = () => {
    setAddModal(true);
  };

  const resetForm = () => {
    setForm({
      ...form,
      ["plan_name"]: "",
      ["expect_budget"]: null,
      ["saving_amount"]: null,
      ["remark"]: "",
    });
  };

  // submit validation
  const validate = () => {
    const option = {
      abortEarly: false,
    };

    const { error } = schema.validate(form, option);

    if (!error) return null;
    const errorData = {};
    for (let item of error.details) {
      const name = item.path[0];
      const message = item.message;
      errorData[name] = message;
    }

    setErrors(errorData);
    return errorData;
  };

  // onclick validation
  const validateProperty = (name, value) => {
    const option = {
      abortEarly: false,
    };

    form[name] = value.currentTarget.value;
    const { error } = schema.validate(form, option);

    const errorData = {};
    setErrors({ ...errors, [name]: null });
    if (error) {
      for (let item of error.details) {
        if (item.path[0] === name) {
          setErrors({ ...errors, [name]: item.message });
        }
      }
    }
  };

  const filterdata = async () => {
    dispatch(getYearPlans(filter));
  };

  const submit = async () => {
    if (validate()) {
      return;
    }

    let data = await dispatch(addYearPlan(form));
    if (data) {
      handleCancelAddModal();
      await message.success({
        content: "Year Plan Added Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelAddModal();
    setErrors([]);
  };

  const handleChangeSelect = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };
  return (
    <div className="year-plan">
      <div className="year-plan-search-bar">
        <AddBoxIcon className="all-income-addIcon" onClick={handleAddModal} />
        <div className="search-area">
          <div className="search-box">
            <Input
              className="search-input"
              placeholder="Search by plan name"
              id="plan_name"
              value={filter.plan_name}
              onChange={(e) => {
                handleChangeSelect("plan_name", e.target.value);
              }}
            />
          </div>
          <div className="search-btn">
            <Button
              className="search-btn"
              variant="contained"
              onClick={filterdata}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="all-year-plans-grid">
        {dataUser.map((val, key) => {
          return (
            <YearPlanCard className="year-plan-card" data={val} key={key} />
          );
        })}
      </div>

      <Modal
        className="edit-yearplan-model"
        open={addModal}
        onCancel={handleCancelAddModal}
        footer={null}
      >
        <div className="add-edit-comp">
          <div className="add-edit-comp-wrapper">
            <div className="add-edit-comp-title">Add Year Plan</div>
            <div className="add-edit-comp-middle">
              <div className="add-edit-comp-middle-lable-data">
                <Input
                  className="add-edit-comp-middle-input"
                  placeholder="Year Plan Name"
                  id="plan_name"
                  value={form.plan_name}
                  onChange={(e) => {
                    validateProperty("plan_name", e);
                  }}
                />
                <p className="input-error">
                  {errors.plan_name ? errors.plan_name : ""}
                </p>
              </div>
              <div className="add-edit-comp-middle-lable-data">
                <Input
                  className="add-edit-comp-middle-input"
                  placeholder="Expected Budget"
                  id="expect_budget"
                  value={form.expect_budget}
                  onChange={(e) => {
                    validateProperty("expect_budget", e);
                  }}
                />
                <p className="input-error">
                  {errors.expect_budget ? errors.expect_budget : ""}
                </p>
              </div>
              <div className="add-edit-comp-middle-lable-data">
                <Input
                  className="add-edit-comp-middle-input"
                  placeholder="Saving Amount"
                  id="saving_amount"
                  value={form.saving_amount}
                  onChange={(e) => {
                    validateProperty("saving_amount", e);
                  }}
                />
                <p className="input-error">
                  {errors.saving_amount ? errors.saving_amount : ""}
                </p>
              </div>
              <div className="add-edit-comp-middle-lable-data">
                <Input
                  className="add-edit-comp-middle-input"
                  placeholder="Remark"
                  id="remark"
                  value={form.remark}
                  onChange={(e) => {
                    validateProperty("remark", e);
                  }}
                />
                <p className="input-error">
                  {errors.remark ? errors.remark : ""}
                </p>
              </div>
            </div>
            <div className="add-edit-comp-btn">
              <Button className="save-btn" variant="contained" onClick={submit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default YearPlan;
