import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentDetails.css";
import "../styles/DraftDetails.css";
import PaymentForm from "../components/forms/PaymentForm";
const PaymentDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    payment: "",
    amount: "",
    email: "",
  });
  const paymentOptions = [
    { value: "", label: "Select Payment Method", disabled: true },
    { value: "Cashfree", label: "Cashfree" },
    { value: "Razorpay", label: "Razorpay" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/payment-details");
  };

  const handleNext = () => {
    navigate("/payment-status");
  };

  return (
    <div className="outer-background">
      <div className="draft-details-container">
        <div className="header-section">
          <div className="page-name">
            <span>Payment Details</span>
            <img src="/icons/cross-icon.svg" alt="Enrollment Icon" />
          </div>
          <div className="subtitle-details">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."
          </div>
        </div>
        <div className="container-draft">
          <div className="payment-header">
            <span className="enrollment-text">Create Payment</span>
            <span>
              <img
                src="/icons/downarrow-icon.svg"
                alt="Enrollment Icon"
                className="student-enrollmentIcon"
              />
            </span>
          </div>
          <PaymentForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            paymentOptions={paymentOptions}
            buttonText="Create Payment"
          />
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
