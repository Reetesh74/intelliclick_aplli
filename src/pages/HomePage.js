import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const PaymentDetails = () => {
  const navigate = useNavigate();

  const handleEnrollmentClick = () => {
    navigate("/student-enrollemnt");
  };
  const handleCreatePaymentClick = () => {
    navigate("/create-payment");
  };
  return (
    <div className="container">
      <h2 className="title">Payment Details</h2>
      <p className="subtitle">
        *Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
      </p>

      <div className="buttonContainer">
        <div className="createPaymentBox">
          <span className="boxTitle">
            <span className="boldText">Create Payment</span>
            <span>
              <img
                src="/icons/downarrow-icon.svg"
                alt="Enrollment Icon"
                className="enrollmentIcon"
              />
            </span>
          </span>
          <button
            className="createPaymentButton"
            onClick={handleCreatePaymentClick}
          >
            <img
              src="/icons/add-icon.svg"
              alt="Enrollment Icon"
              className="enrollmentIcon"
            />
            <span>Create Payment</span>
          </button>
        </div>
        <div className="studentEnrollmentBox">
          <span className="boxTitle-enrollment">
            <span className="boldText">Student Enrollment</span>
            <span>
              <img src="/icons/downarrow-blue.svg" alt="Enrollment Icon" />
            </span>
          </span>

          <button className="enrollmentButton" onClick={handleEnrollmentClick}>
            <img
              src="/icons/enrollment-icon.svg"
              alt="Enrollment Icon"
              className="enrollmentIcon"
            />
            <span>Enrollment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
