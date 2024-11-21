import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PaymentStatus.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PaymentStatus = () => {
  const [paymentEntries, setPaymentEntries] = useState([
    { paymentMethod: "", paymentId: "" },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const steps = [
    "Enrollment Details",
    "Payments Verification",
    "Confirm Order",
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const handlePaymentMethodChange = (index, event) => {
    const newPaymentEntries = [...paymentEntries];
    newPaymentEntries[index].paymentMethod = event.target.value;
    setPaymentEntries(newPaymentEntries);
  };

  const handlePaymentIdChange = (index, event) => {
    const newPaymentEntries = [...paymentEntries];
    newPaymentEntries[index].paymentId = event.target.value;
    setPaymentEntries(newPaymentEntries);
  };

  const handleAddPayment = () => {
    setPaymentEntries([
      ...paymentEntries,
      { paymentMethod: "", paymentId: "" },
    ]);
  };

  const handleRemovePayment = (index) => {
    const newPaymentEntries = paymentEntries.filter((_, i) => i !== index);
    setPaymentEntries(newPaymentEntries);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      navigate("/details-payment");
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      navigate("/payment-status");
    }
  };

  return (
    <div className="outer-background">
      <div className="payment-verification-container">
        <div className="header-section">
          <div className="page-name">
            <span>Payment Details</span>
            <img
              src="/icons/cross-icon.svg"
              alt="Enrollment Icon"
              className="enrollmentIcon"
            />
          </div>
          <div className="subtitle-details">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."
          </div>
        </div>
        <div className="progressbar">
          <ProgressBar currentStep={currentStep} />
        </div>
        <div className="payment-section">
          {paymentEntries.map((entry, index) => (
            <div key={index} className="payment-entry">
              <div
                className="payment"
                style={{
                  backgroundColor: index === 0 ? "#E4EDFA" : "#FBE8FF",
                }}
              >
                <div className="payment-tag">Payment</div>
                <button
                  className="close-button"
                  onClick={() => handleRemovePayment(index)}
                  style={{ display: index > 0 ? "inline-block" : "none" }}
                >
                  <img
                    src="/icons/close-icon.svg"
                    alt="Enrollment Icon"
                    className="enrollmentIcon"
                  />
                </button>
              </div>
              <div className="method-id-payment">
                <div className="form-control" style={{ width: "420px" }}>
                  <label>Payment Method </label>

                  <FormControl sx={{ width: "100%", marginTop:"0px", }}>
                    <Select
                      value={entry.paymentMethod}
                      onChange={(event) =>
                        handlePaymentMethodChange(index, event)
                      }
                      IconComponent={() => (
                        <img
                          src={
                            isDropdownOpen
                              ? "/icons/uparrow-icon.svg"
                              : "/icons/downarrow-icon.svg"
                          }
                          alt="Dropdown Icon"
                          className="dropdown-icon"
                        />
                      )}
                      onOpen={() => setIsDropdownOpen(true)} // Set open state
                      onClose={() => setIsDropdownOpen(false)} // Set close state
                      displayEmpty
                      sx={{
                        height: "40px",
                        margin: "8px 0",
                        borderRadius: "8px",
                        border: "1px solid #94A3B8",
                      }}
                    >
                      {/* Only display the placeholder when the dropdown is not open */}
                      {!isDropdownOpen && (
                        <MenuItem value="" disabled hidden>
                          Select
                        </MenuItem>
                      )}

                      {/* Display options only */}
                      <MenuItem value="creditCard">Credit Card</MenuItem>
                      <MenuItem value="debitCard">Debit Card</MenuItem>
                      <MenuItem value="paypal">PayPal</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="form-control" style={{ width: "420px" }}>
                  <label>Payment ID</label>
                  <input
                    type="text"
                    placeholder="Payment ID"
                    value={entry.paymentId}
                    onChange={(event) => handlePaymentIdChange(index, event)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="button-container" onClick={handleAddPayment}>
          <button className="button-id">
            <img src="/icons/add-icon.svg" alt="Enrollment Icon" />
          </button>
        </div>
      </div>
      <div className="button-section-verification">
        <button
          className="back-button"
          onClick={handleBack}
          style={{ color: "#64748B", background: "#F8FAFC" }}
        >
          Back
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          style={{ color: "#FFFFFF", background: "#184574" }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
