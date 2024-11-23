import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "../../styles/admin.css";
import {
  getStateData,
  getSubjectData,
  addOrUpdateSubject,
} from "../../utils/api";

const SearchableDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(["Acadmic", "Jee", "Neet"]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState(["1", "2", "3", "4"]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boards, setBoards] = useState(["CBSE", "ICSE", "MP Board"]);
  const [selectedValidity, setSelectedValidity] = useState(null);
  const [validity, setValidity] = useState(["Life time validity"]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newMinAmount, setNewMinAmount] = useState("");
  const [newMaxAmount, setNewMaxAmount] = useState("");
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false); // New state for Add Course dialog
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false); // New state for Add Subject dialog
  const [couponDetails, setCouponDetails] = useState("");
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateData = await getStateData("IN");
        if (stateData && typeof stateData === "object") {
          const stateNames = Object.keys(stateData);
          setStates(stateNames);
        } else {
          console.error("State data not found or malformed response");
        }
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectData = await getSubjectData();
        if (subjectData && Array.isArray(subjectData)) {
          const subjectNames = subjectData.map((subject) => subject.name);
          setSubjects(subjectNames);
        } else {
          console.error("Subject data not found or malformed response");
        }
      } catch (error) {
        console.error("Error fetching subject data:", error);
      }
    };

    fetchSubjects();
  }, []);
  const handleAddNewSubject = async () => {
    if (newSubjectName && newMinAmount && newMaxAmount) {
      try {
        // Call the API function to add or update the subject
        const response = await addOrUpdateSubject(
          newSubjectName,
          newMinAmount,
          newMaxAmount
        );
        if (response) {
          setSubjects((prevSubjects) => [...prevSubjects, newSubjectName]);
          setSelectedSubject(newSubjectName);
          handleDialogClose("subject");
        }
      } catch (error) {
        console.error("Error adding/updating subject:", error);
        alert("Failed to add subject. Please try again.");
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    handleMenuClose();
  };

  const handlePriceChange = (event, value) => {
    setSelectedPrice(value); // Update selected price type
  };

  const handleCategoryChange = (event, value) => {
    if (value === "Add Course") {
      setIsCourseDialogOpen(true); // Open the Add Course dialog
    } else {
      setSelectedCategory(value);
    }
  };

  const handleAddState = () => {
    const newState = prompt("Enter the name of the new state:");
    if (newState && !states.includes(newState)) {
      setStates((prevStates) => [...prevStates, newState]); // Add new state to list
      setSelectedState(newState); // Set the newly added state as selected
    } else if (newState) {
      alert("This state already exists!");
    }
  };

  const handleSubjectChange = (event, value) => {
    if (value === "Custom Subject") {
      setIsDialogOpen(true); // Open the dialog box for adding a custom subject
    } else {
      setSelectedSubject(value); // Update selected subject
    }
  };

  const handleBoardChange = (event, value) => {
    if (value === "Add Board") {
      handleAddBoard(); // Trigger custom action for adding a board
    } else {
      setSelectedBoard(value); // Update selected board
    }
  };
  const handleStateChange = (event, value) => {
    if (value === "Add State") {
      handleAddState(); // Trigger the logic for adding a new state
    } else {
      setSelectedState(value); // Update selected state
    }
  };

  const handleAddBoard = () => {
    const newBoard = prompt("Enter the name of the new board:");
    if (newBoard && !boards.includes(newBoard)) {
      setBoards((prevBoards) => [...prevBoards, newBoard]); // Add new board to list
      setSelectedBoard(newBoard); // Set the newly added board as selected
    } else if (newBoard) {
      alert("This board already exists!");
    }
  };

  const handleDialogClose = (dialogType) => {
    if (dialogType === "subject") {
      setIsDialogOpen(false);
    } else if (dialogType === "course") {
      setIsCourseDialogOpen(false);
    } else if (dialogType === "subjectAdd") {
      setIsSubjectDialogOpen(false);
    }

    // Reset input fields
    setNewCourseName("");
    setNewSubjectName("");
    setNewMinAmount("");
    setNewMaxAmount("");
  };

  // Handle adding a new course
  const handleAddCourse = () => {
    if (newCourseName && !categories.includes(newCourseName)) {
      setCategories((prevCategories) => [...prevCategories, newCourseName]);
      setSelectedCategory(newCourseName);
    } else if (newCourseName) {
    }
    handleDialogClose("course"); // Close dialog after adding
  };

  const handleValidityChange = (event, value) => {
    if (value === "Custom Validity") {
      handleAddValidity();
    } else {
      setSelectedValidity(value);
    }
  };

  const handleAddValidity = () => {
    const newValidity = prompt("Enter the name of the new validity:");
    if (newValidity && !validity.includes(newValidity)) {
      setValidity((prevValidity) => [...prevValidity, newValidity]);
      setSelectedValidity(newValidity);
    } else if (newValidity) {
      alert("This validity already exists!");
    }
  };

  const handleClassChange = (event, value) => {
    if (value === "Add Class") {
      handleAddClass();
    } else {
      setSelectedClass(value);
    }
  };

  const handleAddClass = () => {
    const newClass = prompt("Enter the name of the new class:");
    if (newClass && !classes.includes(newClass)) {
      setClasses((prevClasses) => [...prevClasses, newClass]);
      setSelectedClass(newClass);
    } else if (newClass) {
      alert("This class already exists!");
    }
  };

  return (
    <Box sx={{ margin: "80px" }}>
      {/* Category Dropdown */}
      <div className="admin-container">
        <div className="drop-row1">
          <TextField
            label="Course Name"
            placeholder="Enter or Add Course"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // Handle text input change
            className="box-input"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <Autocomplete
            options={["Add Class", ...classes]}
            onChange={handleClassChange}
            value={selectedClass}
            className="box-input"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search or Add Class"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {option === "Add Class" ? (
                  <Typography color="primary" fontWeight="bold">
                    + {option}
                  </Typography>
                ) : (
                  option
                )}
              </li>
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === "Add Class"
            }
            filterOptions={(options, state) => options}
          />
          <Autocomplete
            options={["Add State", ...states]} // Dynamically add "Add State" option at the top
            onChange={handleStateChange}
            value={selectedState}
            className="box-input"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search or Add State"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {option === "Add State" ? (
                  <Typography color="primary" fontWeight="bold">
                    + {option}
                  </Typography>
                ) : (
                  option
                )}
              </li>
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === "Add State"
            }
            filterOptions={(options, state) => options}
          />
        </div>
        <div className="drop-row2">
          {/* Board Dropdown */}
          <Autocomplete
            options={["Add Board", ...boards]}
            onChange={handleBoardChange}
            value={selectedBoard}
            className="box-input"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search or Add Board"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {option === "Add Board" ? (
                  <Typography color="primary" fontWeight="bold">
                    + {option}
                  </Typography>
                ) : (
                  option
                )}
              </li>
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === "Add Board"
            }
            filterOptions={(options, state) => options}
          />
          {/* Validity Dropdown */}
          <Autocomplete
            options={["Custom Validity", ...validity]}
            onChange={handleValidityChange}
            value={selectedValidity}
            className="box-input"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select or Add Validity"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {option === "Custom Validity" ? (
                  <Typography color="primary" fontWeight="bold">
                    + {option}
                  </Typography>
                ) : (
                  option
                )}
              </li>
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === "Custom Validity"
            }
            filterOptions={(options, state) => options}
          />

          <Autocomplete
            options={["Custom Subject", ...subjects]}
            onChange={handleSubjectChange} // Handle selection
            value={selectedSubject} // Controlled value
            className="box-input"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select or Add Subject"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {option === "Custom Subject" ? (
                  <Typography color="primary" fontWeight="bold">
                    + {option}
                  </Typography>
                ) : (
                  option
                )}
              </li>
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === "Custom Subject"
            }
            filterOptions={(options, state) => options}
          />

          {/* Dialog for adding a new subject */}
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Subject Name"
                type="text"
                fullWidth
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Minimum Amount"
                type="number"
                fullWidth
                value={newMinAmount}
                onChange={(e) => setNewMinAmount(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Maximum Amount"
                type="number"
                fullWidth
                value={newMaxAmount}
                onChange={(e) => setNewMaxAmount(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialogClose("subject")}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={handleAddNewSubject} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="drop-row3">
          <TextField
            id="outlined-basic"
            placeholder="Detail of the course"
            variant="outlined"
            className="box-input"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          {/* Custom Menu with Buttons */}
          <TextField
            label="Coupon Details"
            placeholder="Enter coupon details"
            variant="outlined"
            className="box-input"
            value={couponDetails}
            onChange={(e) => setCouponDetails(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </div>
      </div>
    </Box>
  );
};

export default SearchableDropdown;
