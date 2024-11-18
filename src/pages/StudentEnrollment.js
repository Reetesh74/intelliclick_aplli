import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import "../styles/StudentEnrollment.css";
import FormField from "../components/forms/FormField";
function StudentEnrollment() {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    mobile: "",
    parentName: "",
    parentMobile: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // navigate("/details-payment");
    try {
      const paymentData = {
        studentName: formData.studentName,
        mobile:formData.mobile,
        parentName:formData.parentName,
        parentMobile:formData.parentMobile,
        email:formData.email
      };
      const rawResponse = await fetch(
        "https://intelliclick-server-dev-1082184296521.us-central1.run.app/api/enrollment/write/create-or-update",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI0ODZjMDA2NmU3ZWUzMzFiZDJhN2UiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJiaXJhZy5ncHRhQGdtYWlsLmNvbSIsIm5hbWUiOiJCaXJhaiIsImlhdCI6MTczMTkxMzg1N30.Cg1FEhlMsM5o5l5CNosx7CugZ0sAMC7y6kmwJsAooWk",
          },
          body: JSON.stringify(paymentData),
        }
      );
      if (rawResponse.ok) {
        const responseData = await rawResponse.json();
        console.log("Payment created successfully:", responseData);
      } else {
        const errorData = await rawResponse.json();
        console.error("Error creating payment:", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
    }
  };

  return (
    <div className="center-payment-container">
      <div className="container-enrollment">
       
        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <FormField
              label="Customer Name"
              placeholder="Student Name"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
            />
            <FormField
              label="Phone Number"
              placeholder="Phone Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <FormField
              label="Parent’s Name"
              placeholder="Parent’s Name"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
            />
            <FormField
              label="Parent’s Mobile Number"
              placeholder="Phone"
              name="parentMobile"
              value={formData.parentMobile}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <FormField
              label="Email"
              placeholder="Email(optional)"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div className="button-container" onClick={handleSubmit}>
            <button className="button">
              <span>Continue</span>
              <span>
                <img src="/icons/down-icon.svg" alt="Enrollment Icon" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentEnrollment;
