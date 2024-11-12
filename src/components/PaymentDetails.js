import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar/ProgressBar";
import "./styles/PaymentDetails.css";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    planType: "",
    validity: "",
    subjects: "",
    class: "",
    board: "",
    state: "",
    coupon: "6000",
    finalPrice: "6000",
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleNext = () => {
    navigate("/payment-status");
  };

  return (
    <div className="outer-background">
      <div className="payment-details-container">
        <div className="header-section">
          <div className="page-name">
            <span>Payment Details</span>
            <img src="/icons/cross-icon.svg" alt="Enrollment Icon" />
          </div>
          <div className="subtitle-details">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."
          </div>
        </div>
        <div className="progressbar">
          <ProgressBar />
        </div>

        <div className="row1">
          <div className="form-control">
            <label>Plan Type</label>
            <select
              name="planType"
              value={formValues.planType}
              onChange={handleChange}
              className={formValues.state === "" ? "placeholder-selected" : ""}
            >
              <option value="" hidden>
                Select
              </option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          <div className="form-control">
            <label>Validity</label>
            <select
              name="validity"
              value={formValues.validity}
              onChange={handleChange}
              className={formValues.state === "" ? "placeholder-selected" : ""}
            >
              <option value="" hidden>
                Select
              </option>
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="1 year">1 Year</option>
            </select>
          </div>

          <div className="form-control">
            <label>Subjects</label>
            <select
              name="subjects"
              value={formValues.subjects}
              onChange={handleChange}
              className={formValues.state === "" ? "placeholder-selected" : ""}
            >
              <option value="" hidden>
                Select
              </option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="languages">Languages</option>
            </select>
          </div>
        </div>

        <div className="row2">
          <div className="form-control">
            <label>Class</label>
            <select
              name="class"
              value={formValues.class}
              onChange={handleChange}
              className={formValues.state === "" ? "placeholder-selected" : ""}
            >
              <option value="" hidden>
                Select
              </option>
              <option value="10">Class 10</option>
              <option value="12">Class 12</option>
              <option value="undergraduate">Undergraduate</option>
            </select>
          </div>

          <div className="form-control">
            <label>Board</label>
            <select
              name="board"
              value={formValues.board}
              onChange={handleChange}
              className={formValues.state === "" ? "placeholder-selected" : ""}
            >
              <option value="" hidden>
                Select
              </option>
              <option value="cbse">CBSE</option>
              <option value="icse">ICSE</option>
              <option value="state">State Board</option>
            </select>
          </div>

          <div className="form-control">
            <label>State</label>
            <select
              name="state"
              value={formValues.state}
              onChange={handleChange}
              className={formValues.state === "" ? "placeholder-selected" : ""}
            >
              <option value="" hidden>
                Select
              </option>
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>
        </div>

        <div className="coupon-finalprice-section">
          <div className="form-control">
            <label>Coupon</label>
            <input
              type="text"
              name="coupon"
              value={formValues.coupon}
              onChange={handleChange}
              className={formValues.state === "" ? "placeholder-selected" : ""}
              style={{
                width: "22vh",
                borderRadius: "8px 0 0 8px",
                borderRight: "none",
              }}
            />
            <button
              className="next-button"
              style={{
                color: "#FFFFFF",
                background: "#184574",
                padding: "9px 12px",
                cursor: "pointer",
                background: "#8E198F",
              }}
            >
              Apply
            </button>
          </div>

          <div className="coupon-finalprice-section-box">
            <div className="price-section-control">
              <div className="form-control">
                <label>Final Price</label>
                <input
                  type="text"
                  name="finalPrice"
                  value={formValues.finalPrice}
                  onChange={handleChange}
                  className={
                    formValues.state === "" ? "placeholder-selected" : ""
                  }
                />
              </div>
              <div>
                <span className="min" style={{ color: "green" }}>
                  min 5999
                </span>
                <span>-</span>
                <span className="max" style={{ color: "red" }}>
                  max 7999
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-section-details">
        <button
          className="back-button"
          style={{ color: "#64748B", background: "#F8FAFC" }}
        >
          Back
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          style={{ color: "#FFFFFF", background: "#184574" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
