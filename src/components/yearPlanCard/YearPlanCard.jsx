import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";

import "./yearplancard.scss";

import Button from "@mui/material/Button";
import { Modal, Input, Select, message } from "antd";

import {
  deleteYearPlan,
  updateYearPlan,
} from "../../services/actions/yearPlanAction";

const schema = Joi.object({
  plan_name: Joi.string().required().label("Plan Name"),
  expect_budget: Joi.number().required().label("Expect Budget"),
  saving_amount: Joi.number().required().label("Saving Amount"),
  remark: Joi.string().empty("").label("Remarks"),
});

const YearPlanCard = ({ data }) => {
  const [editModal, setEditModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordId, setRecordId] = useState(data._id);
  const [form, setForm] = useState({
    plan_name: data.plan_name,
    expect_budget: data.expect_budget,
    saving_amount: data.saving_amount,
    remark: data.remark,
  });
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleEditModal = () => {
    setEditModal(true);
  };
  const handleCancelEditModal = () => {
    setEditModal(false);
  };
  const showdeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(false);
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

  const handleDelete = async () => {
    let data = dispatch(deleteYearPlan(recordId));

    if (data) {
      handleDeleteModal();
      message.success({
        content: "Year Plan deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleDeleteModal();
  };

  const editSubmit = async () => {
    if (validate()) {
      return;
    }
    let data = dispatch(updateYearPlan(recordId, form)); // save new student data

    if (data) {
      message.success({
        content: "Year Plan Edited Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }

    setEditModal(false);
  };

  return (
    <div className="year-plans">
      <div className="year-plans-wrapper">
        <div className="year-plans-top">
          <div className="year-plans-name">{data.plan_name}</div>
          <div className="year-plans-budget">Budget : {data.expect_budget}</div>
        </div>
        <div className="year-plans-remarks">{data.remark}</div>
        <div className="year-plans-bottom">
          <div className="year-plans-saving-amount">
            Saving Amount : {data.saving_amount}
          </div>
          <div className="year-plans-success-scoure">
            Success{" "}
            {parseFloat(
              (data.saving_amount / data.expect_budget) * 100
            ).toFixed(2)}{" "}
            %
          </div>
        </div>
        <div className="year-plans-buttons">
          <Button
            className="update-btn"
            variant="contained"
            onClick={handleEditModal}
          >
            Update
          </Button>
          <Button
            className="Delete-btn"
            variant="contained"
            color="error"
            onClick={showdeleteModal}
          >
            Delete
          </Button>
        </div>
      </div>
      <Modal
        className="change-access-modal"
        open={isDeleteModalOpen}
        onCancel={handleDeleteModal}
        footer={null}
      >
        <div style={{}} className="change-access">
          <p style={{ fontSize: 18 }}>
            Are you sure want to delete this Year Plan??
          </p>
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
          className="add-student-buttons"
        >
          <Button
            style={{ marginRight: 20 }}
            className="save-btn"
            variant="contained"
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button
            className="cancel-btn"
            variant="contained"
            onClick={handleDeleteModal}
          >
            No
          </Button>
        </div>
      </Modal>

      <Modal
        className="edit-yearplan-model"
        open={editModal}
        onCancel={handleCancelEditModal}
        footer={null}
      >
        <div className="add-edit-comp">
          <div className="add-edit-comp-wrapper">
            <div className="add-edit-comp-title">Edit Year Plan</div>
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
              <Button
                className="save-btn"
                variant="contained"
                onClick={editSubmit}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default YearPlanCard;
