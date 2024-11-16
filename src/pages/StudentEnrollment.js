import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/StudentEnrollment.css";
import FormField from "../components/forms/FormField";
function StudentEnrollment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    phoneNumber: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/details-payment");
  };

  return (
    <div className="center-payment-container">
      <div className="container-enrollment">
        <div className="header">
          <span className="enrollment-text">Student Enrollment</span>
          <span>
            <img
              src="/icons/downarrow-blue.svg"
              alt="Enrollment Icon"
              className="student-enrollmentIcon"
            />
          </span>
        </div>
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
              name="phoneNumber"
              value={formData.phoneNumber}
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
