import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentTable.css";
import PaymentForm from "../components/forms/PaymentForm";

const payments = [
  {
    id: 1,
    date: "4 APR, 2024",
    mode: "Cashfree",
    paymentId: "45657687876866",
    amount: "5000Rs",
    status: "Paid",
  },
  {
    id: 2,
    date: "4 APR, 2024",
    mode: "Cashfree",
    paymentId: "45657687876766",
    amount: "900Rs",
    status: "Pending",
  },
  {
    id: 3,
    date: "4 APR, 2024",
    mode: "Razorpay",
    paymentId: "45657687888666",
    amount: "1000Rs",
    status: "Failed",
  },
];

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Paid: "status-paid",
    Pending: "status-pending",
    Failed: "status-failed",
  };

  return (
    <span className={`status-badge ${statusStyles[status]}`}>{status}</span>
  );
};

const PaymentTable = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    payment: "",
    amount: "",
    email: "",
  });

  const [showForm, setShowForm] = useState(false);
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
    setShowForm(false);
    navigate("/payment-details");
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Payment ID copied to clipboard!");
      })
      .catch((error) => {
        console.error("Copy failed!", error);
      });
  };

  const handleCreateButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div className= "center-payment-container">
      <div className="payment-container">
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
        <table className="payment-table">
          <thead className="paymant-table">
            <tr>
              <th>Created</th>
              <th>Payment Mode</th>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td>{payment.mode}</td>
                <td>
                  {payment.paymentId}
                  <img
                    src="/icons/copy-icon.svg"
                    alt="Enrollment Icon"
                    className="copy-icon"
                    onClick={() => handleCopy(payment.paymentId)}
                  />
                </td>
                <td>{payment.amount}</td>
                <td>
                  <StatusBadge status={payment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!showForm && (
          <div className="button-container-payment">
            <button
              className="createPaymentableButton"
              onClick={handleCreateButtonClick}
            >
              <img
                src="/icons/add-icon.svg"
                alt="Add Icon"
                className="enrollmentIcon"
              />
              <span>Create Payment</span>
            </button>
          </div>
        )}

        {showForm && (
          <PaymentForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            paymentOptions={paymentOptions}
            buttonText="Create Payment"
          />
        )}
      </div>
    </div>
  );
};

export default PaymentTable;
