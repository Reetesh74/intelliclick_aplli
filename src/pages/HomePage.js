import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/forms/PaymentForm";
import PaymentTable from "./PaymentTable";
import "../styles/HomePage.css";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [paymentCreated, setPaymentCreated] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentMobile: "",
    paymentMode: "",
    amount: "",
    email: "",
    currency: "INR",
    course_Id: "667b0abe04c71805e5441a3b",
    createdBy: "672486c0066e7ee331bd2a7e",
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.studentName) {
      formErrors.studentName = "Student name is required.";
      isValid = false;
    }

    if (!formData.studentMobile || formData.studentMobile.length !== 10) {
      formErrors.studentMobile = "Mobile number must be 10 digits.";
      isValid = false;
    }

    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      formErrors.amount = "Amount must be a positive number.";
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (!formData.paymentMode) {
      formErrors.paymentMode = "Please select a payment method.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      localStorage.setItem(
        "authToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI0ODZjMDA2NmU3ZWUzMzFiZDJhN2UiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJiaXJhZy5ncHRhQGdtYWlsLmNvbSIsIm5hbWUiOiJCaXJhaiIsImlhdCI6MTczMTgyMjYwNn0.6hLwQvbBF6kX9tm-DCahca__PWKC0eKocKearl7m60Y"
      );
      const token = localStorage.getItem("authToken");
      console.log("Retrieved token:", token);

      console.log("Request Headers:", {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      });

      const paymentData = {
        studentMobile: formData.studentMobile,
        studentName: formData.studentName,
        email: formData.email,
        course: formData.course_Id,
        createdBy: formData.createdBy,
        amount: formData.amount,
        paymentMode: formData.paymentMode,
        currency: "INR",
      };

      const rawResponse = await fetch(
        "https://intelliclick-server-dev-1082184296521.us-central1.run.app/api/payment/write/create-order",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI0ODZjMDA2NmU3ZWUzMzFiZDJhN2UiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJiaXJhZy5ncHRhQGdtYWlsLmNvbSIsIm5hbWUiOiJCaXJhaiIsImlhdCI6MTczMTgyMjYwNn0.6hLwQvbBF6kX9tm-DCahca__PWKC0eKocKearl7m60Y",
          },
          body: JSON.stringify(paymentData),
        }
      );
      if (rawResponse.ok) {
        const responseData = await rawResponse.json();
        console.log("Payment created successfully:", responseData);
        setPaymentCreated(true);
        setShowForm(false);
      } else {
        const errorData = await rawResponse.json();
        console.error("Error creating payment:", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
    }
  };

  const paymentOptions = [
    { value: "cashfree", label: "cashfree" },
    { value: "razorpay", label: "razorpay" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateButtonClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleEnrollmentClick = () => {
    navigate("/student-enrollemnt");
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
            <span onClick={handleCreateButtonClick}>
              <img
                src={
                  showForm
                    ? "/icons/uparrow-icon.svg"
                    : "/icons/downarrow-icon.svg"
                }
                alt="Toggle Icon"
                className="enrollmentIcon"
              />
            </span>
          </span>
          {!showForm && !paymentCreated && (
            <button
              className="createPaymentButton"
              onClick={handleCreateButtonClick}
            >
              <img
                src="/icons/add-icon.svg"
                alt="Enrollment Icon"
                className="enrollmentIcon"
              />
              <span>Create Payment</span>
            </button>
          )}
          {!paymentCreated && showForm && (
            <PaymentForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              paymentOptions={paymentOptions}
              buttonText="Create Payment"
              errors={errors}
            />
          )}
          <PaymentTable />
          <div style={{ background: "#a8abad1a", height: "90px" }}>
            <button
              className="createPaymentButton-table newPaymentButton"
              onClick={() => {
                setPaymentCreated(false);
                setShowForm(true);
              }}
            >
              <img
                src="/icons/add-icon.svg"
                alt="Create Payment Icon"
                className="enrollmentIcon"
                style={{ width: "24px", height: "24px" }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  lineHeight: "18px",
                  textAlign: "center",
                }}
              >
                Create Payment
              </span>
            </button>
          </div>
          {/* {paymentCreated && (
            <>
              <PaymentTable />
              <div style={{ background: "#a8abad1a", height: "90px" }}>
                <button
                  className="createPaymentButton-table newPaymentButton"
                  onClick={() => {
                    setPaymentCreated(false);
                    setShowForm(true);
                  }}
                >
                  <img
                    src="/icons/add-icon.svg"
                    alt="Create Payment Icon"
                    className="enrollmentIcon"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      textAlign: "center",
                    }}
                  >
                    Create Payment
                  </span>
                </button>
              </div>
            </>
          )} */}
        </div>

        <div className="studentEnrollmentBox">
          <span className="boxTitle-enrollment">
            <span className="boldText">Student Enrollment</span>
            <span>
              <img
                src="/icons/downarrow-blue.svg"
                alt="Enrollment Icon"
                className="enrollmentIcon"
              />
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
