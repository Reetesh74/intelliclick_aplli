// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/PaymentTable.css";
// import PaymentForm from "../components/forms/PaymentForm";

// const payments = [
//   {
//     id: 1,
//     date: "4 APR, 2024",
//     mode: "Cashfree",
//     paymentId: "45657687876866",
//     amount: "5000Rs",
//     status: "Paid",
//   },
//   {
//     id: 2,
//     date: "4 APR, 2024",
//     mode: "Cashfree",
//     paymentId: "45657687876766",
//     amount: "900Rs",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     date: "4 APR, 2024",
//     mode: "Razorpay",
//     paymentId: "45657687888666",
//     amount: "1000Rs",
//     status: "Failed",
//   },
// ];

// const StatusBadge = ({ status }) => {
//   const statusStyles = {
//     Paid: "status-paid",
//     Pending: "status-pending",
//     Failed: "status-failed",
//   };

//   return (
//     <span className={`status-badge ${statusStyles[status]}`}>{status}</span>
//   );
// };

// const PaymentTable = () => {
//   const [formData, setFormData] = useState({
//     customerName: "",
//     phoneNumber: "",
//     payment: "",
//     amount: "",
//     email: "",
//   });

//   const [showForm, setShowForm] = useState(false);
//   const paymentOptions = [
//     { value: "", label: "Select Payment Method", disabled: true },
//     { value: "Cashfree", label: "Cashfree" },
//     { value: "Razorpay", label: "Razorpay" },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     setShowForm(false);
//     navigate("/payment-details");
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         alert("Payment ID copied to clipboard!");
//       })
//       .catch((error) => {
//         console.error("Copy failed!", error);
//       });
//   };

//   const handleCreateButtonClick = () => {
//     setShowForm(true);
//   };

//   return (
//     <div className= "center-payment-container">
//       <div className="payment-container">

//         <table className="payment-table">
//           <thead className="paymant-table">
//             <tr>
//               <th>Created</th>
//               <th>Payment Mode</th>
//               <th>Payment ID</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => (
//               <tr key={payment.id}>
//                 <td>{payment.date}</td>
//                 <td>{payment.mode}</td>
//                 <td>
//                   {payment.paymentId}
//                   <img
//                     src="/icons/copy-icon.svg"
//                     alt="Enrollment Icon"
//                     className="copy-icon"
//                     onClick={() => handleCopy(payment.paymentId)}
//                   />
//                 </td>
//                 <td>{payment.amount}</td>
//                 <td>
//                   <StatusBadge status={payment.status} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {!showForm && (
//           <div className="button-container-payment">
//             <button
//               className="createPaymentableButton"
//               onClick={handleCreateButtonClick}
//             >
//               <img
//                 src="/icons/add-icon.svg"
//                 alt="Add Icon"
//                 className="enrollmentIcon"
//               />
//               <span>Create Payment</span>
//             </button>
//           </div>
//         )}

//         {showForm && (
//           <PaymentForm
//             formData={formData}
//             handleChange={handleChange}
//             handleSubmit={handleSubmit}
//             paymentOptions={paymentOptions}
//             buttonText="Create Payment"
//           />
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import "../styles/PaymentTable.css";

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
  // const [showForm, setShowForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          "https://intelliclick-server-dev-1082184296521.us-central1.run.app/api/payment/read/get-all-payment-orders"
        );
        const data = await response.json();
        setPayments(data.orders);
      } catch (error) {
        console.error("Error fetching payments data:", error);
      }
    };
    fetchPayments();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedId(text);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((error) => {
        console.error("Copy failed!", error);
      });
  };

  const getPaymentStatus = (payment) => {
    if (payment.isPaid) {
      return "Paid";
    }
    if (payment.orderData.status === "failed") {
      return "Failed";
    }
    return "Pending";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="center-payment-container">
      <div className="payment-container">
        <table className="payment-table">
          <thead className="payment-table-head">
            <tr style={{ fontSize: "calc(0.8vw + 0.5vh)" }}>
              <th>Created</th>
              <th style={{ textAlign: "center" }}>Payment Mode</th>
              <th style={{ textAlign: "center" }}>Payment ID</th>
              <th style={{ textAlign: "center" }}>Amount</th>
              <th style={{ textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "calc(0.7vw + 0.4vh)" }}>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{formatDate(payment.orderDate)}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {payment.paymentMode}
                  </td>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    {payment.orderId}
                    <img
                      src="/icons/copy-icon.svg"
                      alt="Copy Icon"
                      className="copy-icon"
                      onClick={() => handleCopy(payment.orderId)}
                      style={{ marginLeft: "5px", cursor: "pointer" }}
                    />
                    {copiedId === payment.orderId && (
                      <span className="copied-message">Copied!</span>
                    )}
                  </td>
                  <td>{`${payment.amount} ${payment.currency}`}</td>
                  <td>
                    <StatusBadge status={getPaymentStatus(payment)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
