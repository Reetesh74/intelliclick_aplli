import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/forms/PaymentForm";
import PaymentTable from "./PaymentTable";
import "../styles/HomePage.css";
import StudentEnrollment from "./StudentEnrollment";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showEnrollment, setShowEnrollemnt] = useState(false);
  const [paymentCreated, setPaymentCreated] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [errors, setErrors] = useState({});
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
  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student name is required.";
    }
    if (!formData.studentMobile.trim()) {
      newErrors.studentMobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.studentMobile)) {
      newErrors.studentMobile = "Enter a valid 10-digit mobile number.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Enter a valid amount.";
    }
    if (!formData.paymentMode) {
      newErrors.paymentMode = "Please select a payment mode.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error("Validation errors:", errors);
      return;
    }
    try {
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
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI0ODZjMDA2NmU3ZWUzMzFiZDJhN2UiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJiaXJhZy5ncHRhQGdtYWlsLmNvbSIsIm5hbWUiOiJCaXJhaiIsImlhdCI6MTczMTkyODI5NH0.osI7Pi8odYkFJhTxpaxf4ZMwIExOMIR4evhnWyTsYP0",
          },
          body: JSON.stringify(paymentData),
        }
      );
      if (rawResponse.ok) {
        const responseData = await rawResponse.json();
        console.log("Payment created successfully:", responseData);
        setPaymentCreated(true);
        setShowForm(false);
        setShowTable(true);
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
    if (paymentCreated) {
      // Reset paymentCreated if the table is being closed
      setShowTable(true);
    }
    setShowForm((prev) => !prev);
  };

  const handleEnrollmentClick = () => {
    setShowEnrollemnt((prev) => !prev);
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
                  showTable || showForm
                    ? "/icons/uparrow-icon.svg"
                    : "/icons/downarrow-icon.svg"
                }
                alt="Toggle Icon"
                className="enrollmentIcon"
              />
            </span>
          </span>
          {/* {!showForm &&  showTable && (
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
          )} */}
          {!showForm && !paymentCreated ? (
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
          ) : (
            !showForm &&
            showTable && (
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
            )
          )}

          {!paymentCreated && showForm && (
            <PaymentForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              paymentOptions={paymentOptions}
              buttonText="Create Payment"
            />
          )}

          {paymentCreated && showForm && showTable && (
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
          )}
        </div>

        <div className="studentEnrollmentBox">
          <span className="boxTitle-enrollment">
            <span className="boldText">Student Enrollment</span>
            <span onClick={handleEnrollmentClick}>
              <img
                src={
                  showEnrollment
                    ? "/icons/up-arrowenrollemnt-icon.svg"
                    : "/icons/downarrow-blue.svg"
                }
                alt="Enrollment Icon"
                className="enrollmentIcon"
              />
            </span>
          </span>
          {!showEnrollment && (
            <button
              className="enrollmentButton"
              onClick={handleEnrollmentClick}
            >
              <img
                src="/icons/enrollment-icon.svg"
                alt="Enrollment Icon"
                className="enrollmentIcon"
              />
              <span>Enrollment</span>
            </button>
          )}
          {showEnrollment && <StudentEnrollment />}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
