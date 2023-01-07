import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import { Modal, message } from "antd";

import "./iecard.scss";
import { AddEditComp } from "../../components";
import {
  deleteMonthExpence,
  updateMonthExpence,
} from "../../services/actions/expencesAction";
import {
  deleteMonthIncome,
  updateMonthIncome,
} from "../../services/actions/incomeAction";
import {
  getPresentMoney,
  updatePresentMoney,
} from "../../services/actions/presentMoneyAction";

const IECard = ({
  data,
  callFunction,
  path,
  dataPaymentMoney,
  handOnMoney,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordId, setRecordId] = useState(data._id);
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

  const handleDelete = async (saveForm, saveId) => {
    if (path == "expence") {
      let data = dispatch(deleteMonthExpence(recordId)); // delete teacher data
      dispatch(updatePresentMoney(saveId, saveForm));
    } else if (path == "income") {
      let data = dispatch(deleteMonthIncome(recordId)); // delete teacher data
      dispatch(updatePresentMoney(saveId, saveForm));
    }
    if (data) {
      handleDeleteModal();
      message.success({
        content: "Expence deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleDeleteModal();
  };

  const editSubmit = async (editForm, saveForm, saveId) => {
    if (path == "expence") {
      let data = dispatch(updateMonthExpence(recordId, editForm)); // save new student data
      dispatch(updatePresentMoney(saveId, saveForm));
    } else if (path == "income") {
      let data = dispatch(updateMonthIncome(recordId, editForm)); // save new student data
      dispatch(updatePresentMoney(saveId, saveForm));
    }
    if (data) {
      message.success({
        content: "Expence Edited Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }

    setEditModal(false);
  };

  const updateCard = (editForm) => {
    editSubmit(editForm);
  };

  const deleteCard = () => {
    let obj = {
      present_saving_money: 0,
      present_hand_money: 0,
      total_present_money: 0,
      remark: "",
    };

    let saveMoneyId = "";

    if (path == "expence" && data.state == "Complete") {
      dataPaymentMoney.map((val) => {
        obj.present_saving_money = val.present_saving_money;
        obj.present_hand_money = val.present_hand_money + data.amount;
        obj.total_present_money =
          val.present_saving_money + val.present_hand_money + data.amount;
        saveMoneyId = val._id;
      });
    } else if (path == "income" && data.state == "Complete") {
      if (data.amount > handOnMoney) {
        message.warning({
          content:
            "You can't change the state. Because the hand on money amount is less that the request money amount.",
          style: {
            marginTop: "10vh",
          },
        });
        return;
      } else {
        dataPaymentMoney.map((val) => {
          obj.present_saving_money = val.present_saving_money;
          obj.present_hand_money = val.present_hand_money - data.amount;
          obj.total_present_money =
            val.present_saving_money + val.present_hand_money - data.amount;
          saveMoneyId = val._id;
        });
      }
    }
    handleDelete(obj, saveMoneyId);
  };

  const changeState = async () => {
    let obj = {
      present_saving_money: 0,
      present_hand_money: 0,
      total_present_money: 0,
      remark: "",
    };

    let saveMoneyId = "";
    let savedMoney = 0;

    let form = {
      month_id: data.month_id,
      name: data.name,
      amount: data.amount,
      state: data.state == "Pending" ? "Complete" : "Pending",
      remark: data.remark,
    };

    if (path == "expence" && data.state == "Pending") {
      if (data.amount > handOnMoney) {
        message.warning({
          content:
            "You can't change the state. Because the hand on money amount is less that the request money amount.",
          style: {
            marginTop: "10vh",
          },
        });
        return;
      } else {
        dataPaymentMoney.map((val) => {
          obj.present_saving_money = val.present_saving_money;
          obj.present_hand_money = val.present_hand_money - data.amount;
          obj.total_present_money =
            val.present_saving_money + val.present_hand_money - data.amount;
          saveMoneyId = val._id;
          savedMoney = val.present_hand_money;
        });
      }
    } else if (path == "expence" && data.state == "Complete") {
      dataPaymentMoney.map((val) => {
        obj.present_saving_money = val.present_saving_money;
        obj.present_hand_money = val.present_hand_money + data.amount;
        obj.total_present_money =
          val.present_saving_money + val.present_hand_money + data.amount;
        saveMoneyId = val._id;
        savedMoney = val.present_hand_money;
      });
    } else if (path == "income" && data.state == "Complete") {
      if (data.amount > handOnMoney) {
        message.warning({
          content:
            "You can't change the state. Because the hand on money amount is less that the request money amount.",
          style: {
            marginTop: "10vh",
          },
        });
        return;
      } else {
        dataPaymentMoney.map((val) => {
          obj.present_saving_money = val.present_saving_money;
          obj.present_hand_money = val.present_hand_money - data.amount;
          obj.total_present_money =
            val.present_saving_money + val.present_hand_money - data.amount;
          saveMoneyId = val._id;
          savedMoney = val.present_hand_money;
        });
      }
    } else if (path == "income" && data.state == "Pending") {
      dataPaymentMoney.map((val) => {
        obj.present_saving_money = val.present_saving_money;
        obj.present_hand_money = val.present_hand_money + data.amount;
        obj.total_present_money =
          val.present_saving_money + val.present_hand_money + data.amount;
        saveMoneyId = val._id;
        savedMoney = val.present_hand_money;
      });
    }

    editSubmit(form, obj, saveMoneyId);
    callFunction();
  };

  return (
    <div className="iecard">
      <div className="iecard-wrapper">
        <div className="iecard-wrapper-top">
          <div className="month">{data.month_id}</div>
          <div
            className="state"
            style={{
              backgroundColor: data.state == "Pending" ? "#DC0000" : "#FFB100",
            }}
          >
            {data.state}
          </div>
        </div>
        <div className="iecard-wrapper-middle">
          <div className="expences-name">{data.name}</div>
          <div className="expences-amount">{data.amount}</div>
        </div>
        <div className="iecard-wrapper-bottom">
          <div className="remarks">{data.remark}</div>
        </div>
        <div className="iecard-wrapper-buttons">
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
          {/* {data.state !== "Complete" && ( */}
          <Button
            className="change-state-btn"
            variant="contained"
            color="success"
            onClick={changeState}
          >
            Change State
          </Button>
          {/* )} */}
        </div>
      </div>
      <Modal
        className="add-expences-model"
        open={editModal}
        onCancel={handleCancelEditModal}
        footer={null}
      >
        <AddEditComp data={data} editedData={updateCard} />
      </Modal>
      <Modal
        className="change-access-modal"
        open={isDeleteModalOpen}
        onCancel={handleDeleteModal}
        footer={null}
      >
        <div style={{}} className="change-access">
          <p style={{ fontSize: 18 }}>
            {path == "income"
              ? "Are you sure want to delete this Income??"
              : "Are you sure want to delete this Expence??"}
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
            onClick={deleteCard}
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
    </div>
  );
};

export default IECard;
