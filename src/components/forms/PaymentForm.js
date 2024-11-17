import React from "react";
import FormField from "./FormField";

function PaymentForm({
  formData,
  handleChange,
  handleSubmit,
  paymentOptions,
  buttonText,
}) {
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="row">
        <FormField
          label="Customer Name"
          placeholder="Student Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
        />
        <FormField
          label="Phone Number"
          placeholder="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <FormField
          label="Payment"
          placeholder="select"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          type="select"
          options={paymentOptions}
        />
        <FormField
          label="Amount"
          placeholder="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <FormField
          label="Email"
          placeholder="Email (optional)"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div className="button-container">
        <button type="submit" className="button-payment">
          <span>{buttonText}</span>
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;