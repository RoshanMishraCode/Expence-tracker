import React, { useContext } from "react";
import { useState } from "react";
import ExpenseTracker from "../../store/expenseTracker";
import Button from "../UI/Button";
import Container from "../UI/Container";
import { flexUi } from "../UI/Container";
import InputBox from "../UI/InputBox";

const AddTransaction = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  // useContext call
  const { addTransaction, income, expense } = useContext(ExpenseTracker);

  // input form handle start
  const [inputData, setInputData] = useState({
    amount: "",
    type: "",
    desc: "",
    date: "",
  });

  const handleInputOnchange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setInputData((prevState) => {
      return { ...prevState, [Name]: Value };
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (inputData.type === "Expence" && income - expense < inputData.amount) {
      alert("You have insufficient balance");
    } else if (
      inputData.desc.trim().length < 1 ||
      inputData.desc.trim().length > 21
    ) {
      console.log(
        inputData.desc.trim().length > 0 || inputData.desc.trim().length < 21
      );
      alert("Description should be 1 to 20 characters");
    } else {
      addTransaction({
        ...inputData,
        date: new Date(inputData.date),
        amount: +inputData.amount,
        id: Math.random(),
        title: inputData.desc,
      });
      setInputData({ amount: "", type: "", desc: "", date: "" });
    }
  };
  // input form handle end

  return (
    <Container>
      <div className={`${flexUi}`}>
        <h5 className="mx-sm-5 mx-2">Balance:₹&nbsp;{income - expense}</h5>
        <Button
          onClick={() => setToggleBtn(!toggleBtn)}
          className={`mx-2 mx-sm-5 ${!toggleBtn ? "btn-dark" : "btn-danger"}`}
          style={{ width: "120px" }}
        >
          {!toggleBtn ? "Add" : "Cancel"}
        </Button>
      </div>
      {toggleBtn && (
        <div className="border shadow rounded bg-white my-3 pt-2">
          <div className="text-end pe-4 pb-2">
            <Button
              onClick={() => setToggleBtn(!toggleBtn)}
              className="fw-bold fs-4 text-danger"
            >
              X
            </Button>
          </div>
          <form
            onSubmit={handleSubmitForm}
            className="row g-3 needs-validation px-4 pb-4"
          >
            <InputBox
              heading="Amount"
              name="amount"
              min="1"
              type="number"
              htmlFor="number"
              value={inputData.amount}
              onChange={handleInputOnchange}
              id="amount"
            />
            <div className="col-sm-6">
              <label htmlFor="type" className="form-label fw-bold">
                Type
              </label>
              <select
                value={inputData.type}
                name="type"
                onChange={handleInputOnchange}
                className="form-select"
                id="validationCustom04"
                required
              >
                <option defaultValue value="" disabled>
                  Choose type...
                </option>
                <option>Income</option>
                <option>Expence</option>
              </select>
            </div>
            <InputBox
              heading="Description"
              name="desc"
              maxlength="20"
              htmlFor="desc"
              value={inputData.desc}
              onChange={handleInputOnchange}
              id="desc"
            />
            <InputBox
              heading="Date"
              name="date"
              type="date"
              htmlFor="date"
              value={inputData.date}
              onChange={handleInputOnchange}
              id="date"
            />
            <div className="col-12">
              <Button className="btn-dark" type="submit">
                Add Transaction
              </Button>
            </div>
          </form>
        </div>
      )}
    </Container>
  );
};

export default AddTransaction;
