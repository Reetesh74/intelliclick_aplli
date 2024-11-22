import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import "../styles/PaymentDetails.css";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    period: "",
    name: "",
    subjects: [],
    class: "",
    board: "",
    state: "",
    interval: 1,
    coupon: "",
    amount: "",
    maxAmount: "",
    minAmount: "",
    standards: ["667b0abe04c71805e5441a3b"],
    currency: "INR",
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubjectAddButtonClick = () => {
    if (currentSubject && !selectedSubjects.includes(currentSubject)) {
      setSelectedSubjects([...selectedSubjects, currentSubject]); // Add subject
      setCurrentSubject(""); // Clear the current selection
    }
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleNext = async () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    navigate("/payment-status");

    try {
      const requestData = {
        period: formValues.period,
        name: formValues.name,
        subjects: formValues.subjects,
        class: formValues.class,
        board: formValues.board,
        state: formValues.state,
        interval: formValues.interval,
        coupon: formValues.coupon,
        amount: formValues.amount,
        maxAmount: formValues.maxAmount,
        minAmount: formValues.minAmount,
        standards: formValues.standards,
        currency: formValues.currency,
      };
      // const toggleDropdown = () => {
      //   setDropdownVisible((prev) => !prev);
      // };

      requestData = {
        ...formValues,
        subjects: selectedSubjects,
      };

      const rawResponse = await fetch(
        "https://intelliclick-server-dev-1082184296521.us-central1.run.app/api/plan/write/create-or-update",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI0ODZjMDA2NmU3ZWUzMzFiZDJhN2UiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJiaXJhZy5ncHRhQGdtYWlsLmNvbSIsIm5hbWUiOiJCaXJhaiIsImlhdCI6MTczMTkyODI5NH0.osI7Pi8odYkFJhTxpaxf4ZMwIExOMIR4evhnWyTsYP0",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (rawResponse.ok) {
        const responseData = await rawResponse.json();
        console.log("Payment created successfully:", responseData);
        // setPaymentCreated(true);
        // setShowForm(false);
        // setShowTable(true);
      } else {
        const errorData = await rawResponse.json();
        console.error("Error creating payment:", errorData);
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const getValidityOptions = () => {
    if (formValues.planType === "monthly") {
      return Array.from({ length: 12 }, (_, i) => `${i + 1} month`);
    } else if (formValues.planType === "yearly") {
      return ["1 year", "2 years"];
    }
    return [];
  };

  // const handleSubjectAddButtonClick = () => {
  //   setDropdownOpen((prev) => !prev);
  // };

  const handleSubjectSelect = (subject) => {
    setCurrentSubject(subject); // Set selected subject in state
  };

  const subjectsOptions = ["Math", "English", "Hindi"];

  return (
    <div className="outer-background">
      <div className="payment-details-container">
        <div className="header-section">
          <div className="page-name">
            <span>Student Details</span>
            <img src="/icons/cross-icon.svg" alt="Enrollment Icon" />
          </div>
        </div>
        <div className="progressbar">
          <ProgressBar />
        </div>
        <div className="form-control">
          <label>Select Course</label>
          <FormControl>
            <Select
              name="plan1"
              value={formValues.planType}
              onChange={handleChange}
              IconComponent={() => (
                <img
                  src={
                    isDropdownOpen
                      ? "/icons/select-uparrow-icon.svg"
                      : "/icons/select-downarrow-icon.svg"
                  }
                  alt="Dropdown Icon"
                  className="select-icon"
                />
              )}
              onOpen={() => setIsDropdownOpen(true)} // Set open state
              onClose={() => setIsDropdownOpen(false)} // Set close state
              displayEmpty
              sx={{
                height: "40px",
                width: "16.4vw",
                margin: "8px 0",
                borderRadius: "8px",
                background: "#F8FAFC",
                color:"#64748B"
              }}
              renderValue={(selected) => (!selected ? "Select" : selected)}
            >
              <MenuItem value="plan1">Academic</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="row1">
          <div className="form-control">
            <label>Tenure</label>
            <FormControl sx={{ width: "100%", marginTop: "0px" }}>
              <Select
                name="planType"
                value={formValues.planType}
                onChange={handleChange}
                IconComponent={() => (
                  <img
                    src={
                      isDropdownOpen
                        ? "/icons/select-uparrow-icon.svg"
                        : "/icons/select-downarrow-icon.svg"
                    }
                    alt="Dropdown Icon"
                    className="select-icon"
                  />
                )}
                onOpen={() => setIsDropdownOpen(true)} // Set open state
                onClose={() => setIsDropdownOpen(false)} // Set close state
                displayEmpty
                sx={{
                  height: "40px",
                  width: "16.4vw",
                  margin: "8px 0",
                  borderRadius: "8px",
                  background: "#F8FAFC",
                  color: "#64748B",
                }}
                renderValue={(selected) => (!selected ? "Select" : selected)}
              >
                {/* Placeholder logic managed via renderValue */}
                <MenuItem value="yearly">Yearly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-control">
            <label>Validity</label>

            <FormControl sx={{ width: "100%", marginTop: "0px" }}>
              <Select
                name="validity"
                value={formValues.validity}
                onChange={handleChange}
                IconComponent={() => (
                  <img
                    src={
                      isDropdownOpen
                        ? "/icons/select-uparrow-icon.svg"
                        : "/icons/select-downarrow-icon.svg"
                    }
                    alt="Dropdown Icon"
                    className="select-icon"
                  />
                  
                )}
                onOpen={() => setIsDropdownOpen(true)} // Set open state
                onClose={() => setIsDropdownOpen(false)} // Set close state
                displayEmpty
                sx={{
                  height: "40px",
                  width: "16.4vw",
                  margin: "8px 0",
                  borderRadius: "8px",
                  background: "#F8FAFC",
                  color:"#64748B"
                }}
                renderValue={(selected) => (!selected ? "Select" : selected)}
              >
                {getValidityOptions().map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          
          {formValues.subjects === "individual" && (
            <div className="select-container">
              {/* Dropdown for selecting a subject */}
              <select
                className="select-dropdown"
                onChange={(e) => handleSubjectSelect(e.target.value)}
                value={currentSubject || ""}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjectsOptions.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {/* Add Button */}
              <button
                className="button-id"
                onClick={handleSubjectAddButtonClick}
              >
                <img src="/icons/add-icon.svg" alt="Add Subject" />
              </button>

              {/* List of Selected Subjects */}
              <ul className="selected-subjects-list">
                {selectedSubjects.map((subject, index) => (
                  <li key={index}>
                    {subject}
                    <button
                      onClick={() =>
                        setSelectedSubjects(
                          selectedSubjects.filter((s) => s !== subject)
                        )
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="form-control">
            <label>Subjects</label>

            <FormControl sx={{ width: "100%", marginTop: "0px" }}>
              <Select
                name="subjects"
                multiple
                value={formValues.subjects}
                onChange={handleChange}
                IconComponent={() => (
                  <img
                    src={
                      isDropdownOpen
                        ? "/icons/select-uparrow-icon.svg"
                        : "/icons/select-downarrow-icon.svg"
                    }
                    alt="Dropdown Icon"
                    className="select-icon"
                  />
                )}
                onOpen={() => setIsDropdownOpen(true)} // Set open state
                onClose={() => setIsDropdownOpen(false)} // Set close state
                displayEmpty
                sx={{
                  height: "40px",
                  width: "16.4vw",
                  margin: "8px 0",
                  borderRadius: "8px",
                 color:"#64748B",
                  background: "#F8FAFC",
                }}
                renderValue={(selected) =>
                  Array.isArray(selected) && selected.length === 0 ? "Select" : selected.join(", ")
                }
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="individual">Individual</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="row2">
          <div className="form-control">
            <label>Class</label>

            <FormControl sx={{ width: "100%", marginTop: "0px" }}>
              <Select
                name="class"
                value={formValues.class}
                onChange={handleChange}
                IconComponent={() => (
                  <img
                    src={
                      isDropdownOpen
                        ? "/icons/select-uparrow-icon.svg"
                        : "/icons/select-downarrow-icon.svg"
                    }
                    alt="Dropdown Icon"
                    className="select-icon"
                  />
                )}
                onOpen={() => setIsDropdownOpen(true)} // Set open state
                onClose={() => setIsDropdownOpen(false)} // Set close state
                displayEmpty
                sx={{
                  height: "40px",
                  width: "16.4vw",
                  margin: "8px 0",
                  borderRadius: "8px",
                  color:"#64748B",
                  background: "#F8FAFC",
                }}
                renderValue={(selected) => (!selected ? "Select" : selected)}
              >
                <MenuItem value="12">Class 12</MenuItem>
                <MenuItem value="10">Class 10</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-control">
            <label>Board</label>

            <FormControl sx={{ width: "100%", marginTop: "0px" }}>
              <Select
                name="board"
                value={formValues.board}
                onChange={handleChange}
                IconComponent={() => (
                  <img
                    src={
                      isDropdownOpen
                        ? "/icons/select-uparrow-icon.svg"
                        : "/icons/select-downarrow-icon.svg"
                    }
                    alt="Dropdown Icon"
                    className="select-icon"
                  />
                )}
                onOpen={() => setIsDropdownOpen(true)} // Set open state
                onClose={() => setIsDropdownOpen(false)} // Set close state
                displayEmpty
                sx={{
                  height: "40px",
                  width: "16.4vw",
                  margin: "8px 0",
                  borderRadius: "8px",
                  color:"#64748B",
                  background: "#F8FAFC",
                }}
                renderValue={(selected) => (!selected ? "Select" : selected)}
              >
                <MenuItem value="state">State Board</MenuItem>
                <MenuItem value="icse">ICSE</MenuItem>
                <MenuItem value="cbse">CBSE</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-control">
            <label>State</label>

            <FormControl sx={{ width: "100%", marginTop: "0px" }}>
              <Select
                name="state"
                value={formValues.state}
                onChange={handleChange}
                IconComponent={() => (
                  <img
                    src={
                      isDropdownOpen
                        ? "/icons/select-uparrow-icon.svg"
                        : "/icons/select-downarrow-icon.svg"
                    }
                    alt="Dropdown Icon"
                    className="select-icon"
                  />
                )}
                onOpen={() => setIsDropdownOpen(true)} // Set open state
                onClose={() => setIsDropdownOpen(false)} // Set close state
                displayEmpty
                sx={{
                  height: "40px",
                  width: "16.4vw",
                  margin: "8px 0",
                  borderRadius: "8px",
                  background: "#F8FAFC",
                  color:"#64748B"
                }}
                renderValue={(selected) => (!selected ? "Select" : selected)}
              >
                <MenuItem value="maharashtra">Maharashtra</MenuItem>
                <MenuItem value="karnataka">Karnataka</MenuItem>
                <MenuItem value="delhi">Delhi</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="coupon-finalprice-section">
          <div className="form-control">
            <label>Coupon</label>
            <input
              type="text"
              name="coupon"
              value={formValues.coupon}
              onChange={handleChange}
              className={formValues.state === "" ? "placeholder-selected" : ""}
              style={{
                width: "22vh",
                borderRadius: "8px 0 0 8px",
                borderRight: "none",
              }}
            />
            <button
              className="next-button"
              style={{
                color: "#FFFFFF",
                background: "#184574",
                padding: "9px 12px",
                cursor: "pointer",
                background: "#8E198F",
              }}
            >
              Apply
            </button>
          </div>

          <div className="coupon-finalprice-section-box">
            <div className="price-section-control">
              <div className="form-control">
                <label>Final Price</label>
                <input
                  type="text"
                  name="finalPrice"
                  value={formValues.finalPrice}
                  onChange={handleChange}
                  className={
                    formValues.state === "" ? "placeholder-selected" : ""
                  }
                />
              </div>
              <div>
                <span className="min" style={{ color: "green" }}>
                  min 5999
                </span>
                <span>-</span>
                <span className="max" style={{ color: "red" }}>
                  max 7999
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button Section */}
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

      {/* Modal for Confirmation */}
      {showModal && (
        <div className="modal">
          <div className="modal-container">
            <button
              className="close-popup"
              style={{ textAlign: "right" }}
              onClick={handleClose}
            >
              <img
                src="/icons/cross-icon.svg"
                alt="Enrollment Icon"
                className="enrollmentIcon"
              />
            </button>
            <div className="modal-content">
              <h3>Confirm Your Details</h3>
              <ul>
                <li>
                  <span>Plan Type:</span> <span>{formValues.planType}</span>
                </li>
                <li>
                  <span>Validity:</span> <span>{formValues.validity}</span>
                </li>
                <li>
                  <span>Subjects:</span>
                  <span> {formValues.subjects}</span>
                </li>
                <li>
                  <span>Class:</span> <span>{formValues.class}</span>
                </li>
                <li>
                  <span>Board:</span> <span>{formValues.board}</span>
                </li>
                <li>
                  <span>State:</span>
                  <span>{formValues.state}</span>{" "}
                </li>
                <li>
                  <span>Final Price:</span>
                  <span>{formValues.finalPrice}</span>{" "}
                </li>
              </ul>
              <button className="popup" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
