import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";

import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import { Input, Select, Modal, message } from "antd";

import { IECard } from "../../components";
import {
  getMonthIncomes,
  addMonthIncome,
} from "../../services/actions/incomeAction";
import {
  getPresentMoney,
  updatePresentMoney,
} from "../../services/actions/presentMoneyAction";

import "./allincome.scss";

// schema for validation

const schema = Joi.object({
  month_id: Joi.string().required().label("Month ID"),
  name: Joi.string().required().label("Income Name"),
  amount: Joi.number().optional().label("Amount"),
  state: Joi.string().required().label("State"),
  remark: Joi.string().empty("").label("Remarks"),
});

const AllIncome = () => {
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({
    month_id: "",
    name: "",
    amount: null,
    state: "Pending",
    remark: "",
  });
  const [errors, setErrors] = useState([]);
  const [pendingExpences, setPendingExpences] = useState(0);
  const [completeExpences, setCompleteExpences] = useState(0);
  const [totalExpences, setTotalExpences] = useState(0);
  const [handOnMoney, setHandOnMoney] = useState(0);
  const [filter, setFilter] = useState({
    month_id: "",
    state: "",
  });

  const dispatch = useDispatch();

  let searchObj = {
    month_id: "",
    state: "",
  };
  let presentMoneyObj = {
    remark: "",
  };
  useEffect(() => {
    dispatch(getMonthIncomes(searchObj)); // load data to redux store
    dispatch(getPresentMoney(presentMoneyObj)); // load data to redux store
  }, [dispatch]);

  useEffect(() => {
    calculateAllExpences();
  });

  const dataPaymentMoney = useSelector((state) => state.PRESENT_MONEY);
  const dataUser = useSelector((state) => state.INCOMES);

  const filterdata = () => {
    dispatch(getMonthIncomes(filter));
  };
  const clearFilter = () => {
    let searchObj = {
      month_id: "",
      state: "",
    };
    dispatch(getMonthIncomes(searchObj));
    clearFilterForm();
  };

  const handleChangeFilter = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  const calculateAllExpences = () => {
    let temptotalPendingExpences = 0;
    let temptotalCompleteExpences = 0;
    let tempHandOnMoney = 0;
    dataUser.map((val) => {
      if (val.state == "Pending") {
        temptotalPendingExpences = temptotalPendingExpences + val.amount;
      } else if (val.state == "Complete") {
        temptotalCompleteExpences = temptotalCompleteExpences + val.amount;
      }
    });

    dataPaymentMoney.map((val) => {
      tempHandOnMoney = val.present_hand_money;
    });

    setHandOnMoney(tempHandOnMoney);
    setPendingExpences(temptotalPendingExpences);
    setCompleteExpences(temptotalCompleteExpences);
    setTotalExpences(temptotalPendingExpences + temptotalCompleteExpences);
  };

  const handleCancelAddModal = () => {
    setAddModal(false);
    resetForm();
  };
  const handleAddModal = () => {
    setAddModal(true);
    calculateAllExpences();
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

  const resetForm = () => {
    setForm({
      ...form,
      ["month_id"]: "",
      ["name"]: "",
      ["amount"]: null,
      ["state"]: "Pending",
      ["remark"]: "",
    });
  };

  const clearFilterForm = () => {
    setFilter({
      ...filter,
      ["month_id"]: "",
      ["state"]: "",
    });
  };

  const handleChangeSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const submit = async () => {
    if (validate()) {
      return;
    }

    let data = await dispatch(addMonthIncome(form)); // save new expences data
    if (data) {
      handleCancelAddModal();
      await message.success({
        content: "Income Added Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelAddModal();
    setErrors([]);
  };

  return (
    <div className="all-income">
      <div className="all-income-filter">
        <AddBoxIcon className="all-income-addIcon" onClick={handleAddModal} />
        <div className="filter-area">
          <div className="select-box">
            <Select
              className="all-expences-filterByMonth"
              placeholder="Filter by month"
              value={filter.month_id}
              onChange={(value) => {
                handleChangeFilter("month_id", value);
              }}
              style={{ width: "150px" }}
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
            <Select
              className="all-expences-filterByState"
              value={filter.state}
              onChange={(value) => {
                handleChangeFilter("state", value);
              }}
              style={{ width: "150px" }}
              placeholder="Filter by State"
              options={[
                {
                  value: "Pending",
                  label: "Pending",
                },
                {
                  value: "Complete",
                  label: "Complete",
                },
              ]}
            />
          </div>
          <div className="filter-button">
            <Button
              className="filter-btn"
              variant="contained"
              onClick={filterdata}
            >
              Filter
            </Button>
            <Button
              className="clear-filter-btn"
              variant="contained"
              onClick={clearFilter}
            >
              Clear Filter
            </Button>
          </div>
        </div>
        <div className="expences">
          <div className="pending-expences">
            Pending Income : {pendingExpences}
          </div>
          <div className="complete-expences">
            Complete Income : {completeExpences}
          </div>
          <div className="all-expences">All Income : {totalExpences}</div>
          <div className="hand-on-money">Hand on Money : {handOnMoney}</div>
        </div>
      </div>
      <div className="all-income-grids">
        {dataUser.map((val, key) => {
          return (
            <IECard
              className="ie-card"
              data={val}
              key={key}
              dataPaymentMoney={dataPaymentMoney}
              callFunction={calculateAllExpences}
              handOnMoney= {handOnMoney}
              path={"income"}
            />
          );
        })}
      </div>
      <Modal
        className="add-expences-model"
        open={addModal}
        onCancel={handleCancelAddModal}
        footer={null}
      >
        <div className="add-edit-comp">
          <div className="add-edit-comp-wrapper">
            <div className="add-edit-comp-title">Add Income</div>
            <div className="add-edit-comp-middle">
              <div className="add-edit-comp-middle-lable-data">
                <Select
                  style={{ width: 200 }}
                  className="add-edit-comp-middle-select"
                  value={form.month_id}
                  onChange={(value) => {
                    handleChangeSelect("month_id", value);
                  }}
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
                  placeholder="Income Name"
                  id="name"
                  value={form.name}
                  onChange={(e) => {
                    validateProperty("name", e);
                  }}
                />
                <p className="input-error">{errors.name ? errors.name : ""}</p>
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
                <p className="input-error">
                  {errors.amount ? errors.amount : ""}
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

export default AllIncome;
