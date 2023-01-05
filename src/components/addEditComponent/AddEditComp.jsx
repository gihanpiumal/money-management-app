import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";

import {
  Input,
  Select,
  DatePicker,
  message,
  Modal,
  Radio,
  TimePicker,
} from "antd";
import Button from "@mui/material/Button";

import "./addeditcomp.scss";
import { updateMonthExpence } from "../../services/actions/expencesAction";

// schema for validation

const schema = Joi.object({
  month_id: Joi.string().required().label("Month ID"),
  name: Joi.string().required().label("Income Name"),
  amount: Joi.number().optional().label("Amount"),
  state: Joi.string().required().label("State"),
  remark: Joi.string().empty("").label("Remarks"),
});

const AddEditComp = ({ data, editedData }) => {
  // states difine
  const [form, setForm] = useState({
    month_id: data.month_id,
    name: data.name,
    amount: data.amount,
    state: data.state,
    remark: data.remark,
  });
  const [errors, setErrors] = useState([]);
  const [recordId, setRecordId] = useState(data._id);
  const dispatch = useDispatch();

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

  const submit = async () => {
    console.log(form);
    if (validate()) {
      return;
    }

    return editedData(form);
  };

  const handleChangeSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="add-edit-comp">
      <div className="add-edit-comp-wrapper">
        <div className="add-edit-comp-title">Add Expences</div>
        <div className="add-edit-comp-middle">
          <div className="add-edit-comp-middle-lable-data">
            <Select
              className="add-edit-comp-middle-input"
              onChange={(value) => {
                handleChangeSelect("month_id", value);
              }}
              value={form.month_id}
              placeholder="Select the month"
              options={[
                {
                  value: "January",
                  label: "January",
                },
                {
                  value: "February",
                  label: "February",
                },
                {
                  value: "March",
                  label: "March",
                },
                {
                  value: "Aprile",
                  label: "Aprile",
                },
                {
                  value: "May",
                  label: "May",
                },
                {
                  value: "June",
                  label: "June",
                },
                {
                  value: "July",
                  label: "July",
                },
                {
                  value: "Augest",
                  label: "Augest",
                },
                {
                  value: "September",
                  label: "September",
                },
                {
                  value: "October",
                  label: "October",
                },
                {
                  value: "November",
                  label: "November",
                },
                {
                  value: "December",
                  label: "December",
                },
              ]}
            />
            <p className="input-error">
              {errors.month_id ? errors.month_id : ""}
            </p>
          </div>
          <div className="add-edit-comp-middle-lable-data">
            <Input
              className="add-edit-comp-middle-input"
              placeholder="Expence Name"
              id="name"
              value={form.name}
              onChange={(e) => {
                validateProperty("name", e);
              }}
            />
            <p className="input-error">
              {errors.name ? errors.name : ""}
            </p>
          </div>
          <div className="add-edit-comp-middle-lable-data">
            <Input
              className="add-edit-comp-middle-input"
              placeholder="Amount"
              id="amount"
              value={form.amount}
              onChange={(e) => {
                validateProperty("amount", e);
              }}
            />
            <p className="input-error">{errors.amount ? errors.amount : ""}</p>
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
            <p className="input-error">{errors.remark ? errors.remark : ""}</p>
          </div>
        </div>
        <div className="add-edit-comp-btn">
          <Button className="save-btn" variant="contained" onClick={submit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEditComp;
