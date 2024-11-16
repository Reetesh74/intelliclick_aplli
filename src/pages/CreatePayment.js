import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/forms/PaymentForm";

function CreatePayment() {
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

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/payment-details");
  };

  return (
    <div className="center-payment-container">
      <div className="container-enrollment">
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
  );
}

export default CreatePayment;
