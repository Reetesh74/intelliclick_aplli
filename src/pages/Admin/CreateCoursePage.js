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
  createOrUpdatePlan,
  getClassData,
  createOrUpdateStandard,
} from "../../utils/api";

const SearchableDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(["Acadmic", "Jee", "Neet"]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boards, setBoards] = useState(["CBSE", "ICSE", "MP Board"]);
  const [selectedValidity, setSelectedValidity] = useState(null);
  const [validity, setValidity] = useState(["Life time validity"]);
  const [selectedSubject, setSelectedSubject] = useState([]);
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
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [planDetails, setPlanDetails] = useState({
    name: "",
    planType: "fixed",
    period: "yearly",
    currency: "INR",
    interval: 1,
    board: "",
    standards: [],
    productIds: [],
    coupon: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleStateChange = async (event, value) => {
    setSelectedState(value);

    if (value) {
      try {
        const stateData = await getStateData("IN");
        const cityList = stateData[value];
        if (Array.isArray(cityList)) {
          setCities(cityList);
        } else {
          console.error("No cities found for the selected state");
          setCities([]);
        }
      } catch (error) {
        console.error("Error fetching cities for the selected state:", error);
        setCities([]);
      }
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event, value) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const classData = await getClassData();
        if (classData && Array.isArray(classData)) {
          setClasses(classData);
        } else {
          console.error("Class data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClass();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectData = await getSubjectData();
        if (subjectData && Array.isArray(subjectData)) {
          setSubjects(subjectData);
        } else {
          console.error("Subject data not found or malformed response");
        }
      } catch (error) {
        console.error("Error fetching subject data:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddStandard = async () => {
    const standardDetails = {
      name: newClassName,
      telecrmClassName: newClassName,
      parent: "classes",
      isDisabled: false,
      order: 11,
    };

    try {
      const response = await createOrUpdateStandard(standardDetails);
      if (response) {
        handleClassDialogClose();
      } else {
        console.error("Error creating/updating standard.");
      }
    } catch (error) {
      console.error("Error in calling createOrUpdateStandard:", error);
    }
  };

  const handleAddNewSubject = async () => {
    if (newSubjectName && newMinAmount && newMaxAmount) {
      try {
        // Add or update subject via API
        const response = await addOrUpdateSubject(
          newSubjectName,
          newMinAmount,
          newMaxAmount
        );

        if (response) {
          const newSubject = {
            _id: response.id || Date.now(), // Fallback ID if API doesn't return one
            name: newSubjectName,
          };

          setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
          setSelectedSubject(newSubject);
          handleDialogClose("subject");
        }
      } catch (error) {
        alert("Failed to add subject. Please try again.");
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleAddPlan = async () => {
    if (!selectedSubject) {
      alert("Please select a subject before submitting the plan.");
      return;
    }

    try {
      if (planDetails.productIds.length === 0) {
        const selectedSubjectData = subjects.find(
          (subject) => subject.name === selectedSubject
        );
        const selectedSubjectId = selectedSubjectData
          ? selectedSubjectData.id
          : null;

        if (selectedSubjectId) {
          setPlanDetails((prevState) => ({
            ...prevState,
            productIds: [selectedSubjectId],
          }));
        } else {
          alert("Invalid subject selected.");
          return;
        }
      }

      const response = await createOrUpdatePlan(planDetails);
    } catch (error) {
      alert("An error occurred while creating/updating the plan.");
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
      setStates((prevStates) => [...prevStates, newState]);
      setSelectedState(newState);
    } else if (newState) {
      alert("This state already exists!");
    }
  };

  const handleClassDialogClose = () => {
    setIsClassDialogOpen(false);
    setNewClassName(""); // Reset the input field
  };

  const handleClassSubmit = () => {
    if (newClassName && !classes.find((cls) => cls.name === newClassName)) {
      const newClass = { _id: Date.now(), name: newClassName };
      setClasses((prevClasses) => [...prevClasses, newClass]);
      setSelectedClass(newClass); // Optionally select the newly added class
    } else {
      alert("Class already exists or name is invalid!");
    }
    handleClassDialogClose(); // Close dialog after adding
  };

  const handleAddClass = () => {
    setIsClassDialogOpen(true); // Open the dialog instead of `prompt`
  };

  const handleSubjectChange = (event, value) => {
    console.log("Selected value:", value);

    if (value?.name === "Custom Subject") {
      setIsDialogOpen(true); // Open the dialog for custom subject
    } else if (value?._id) {
      setSelectedSubject(value);
      console.log("Selected subject ID:", value._id);
      setPlanDetails((prevState) => ({
        ...prevState,
        productIds: [...prevState.productIds, value._id], // Allow multiple subjects
      }));
    } else {
      console.warn("Invalid value selected:", value);
    }
  };

  const handleBoardChange = (event, value) => {
    if (value === "Add Board") {
      handleAddBoard(); // Trigger custom action for adding a board
    } else {
      // Update selected board state and planDetails.board directly
      setSelectedBoard(value); // Update the selectedBoard state
      setPlanDetails((prevState) => ({
        ...prevState,
        board: value, // Ensure the selected board value is set here
      }));
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
    if (value?.name === "Add Class") {
      handleAddClass(); // Open the dialog to add a new class
    } else if (value?._id) {
      setSelectedClass(value);
      setPlanDetails((prevState) => ({
        ...prevState,
        standards: [value._id], // Use the selected class _id
      }));
    } else {
      console.error("Selected class not valid:", value);
    }
  };

  return (
    <Box sx={{ margin: "80px" }}>
      {/* Category Dropdown */}
      <div className="admin-container">
        <div className="drop-row1">
          <TextField
            placeholder="Enter or Add Course"
            name="name"
            value={planDetails.name}
            onChange={handleChange}
            className="box-input"
            sx={{
              backgroundColor: "#F8FAFC",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "&.css-mrp3ap-MuiFormControl-root-MuiTextField-root": {
                display: "unset !important",
                flexDirection: "unset !important",
                border: "unset !important",
              },
            }}
          />

          <Autocomplete
            options={[...classes, { _id: "add-class", name: "Add Class" }]} // Special option for Add Class
            onChange={(event, value) => {
              if (value?.name === "Add Class") {
                handleAddClass(); // Open the dialog
              } else if (value?._id) {
                setSelectedClass(value);
                setPlanDetails((prevState) => ({
                  ...prevState,
                  standards: [value._id], // Use the selected class _id
                }));
              }
            }}
            value={selectedClass}
            className="box-input"
            getOptionLabel={(option) => option?.name || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search or Add Class"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F8FAFC !important", // Ensure it's applied
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {option.name === "Add Class" ? (
                  <Typography color="primary" fontWeight="bold">
                    + {option.name}
                  </Typography>
                ) : (
                  option.name
                )}
              </li>
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
          <Dialog open={isClassDialogOpen} onClose={handleClassDialogClose}>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Class Name"
                type="text"
                fullWidth
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClassDialogClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleAddStandard} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Autocomplete
            options={states}
            onChange={handleStateChange}
            value={selectedState}
            className="box-input"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search State"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F8FAFC !important", // Ensure it's applied
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            isOptionEqualToValue={(option, value) => option === value}
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
                    backgroundColor: "#F8FAFC !important",
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
          {/* <Autocomplete
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
          /> */}
          <div className="newSubject">
            <Autocomplete
              multiple
              options={subjects} // Pass the subjects array
              onChange={(event, value) => {
                console.log("Selected values:", value);
                setSelectedSubject(value); // Update the selected subjects state
                setPlanDetails((prevState) => ({
                  ...prevState,
                  productIds: value.map((subject) => subject._id), // Map selected subjects to their IDs
                }));
              }}
              value={selectedSubject} // Controlled value as an array
              className="box-input"
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Subjects"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F8FAFC !important",
                      borderRadius: "8px",
                    },
                  }}
                />
              )}
              getOptionLabel={(option) => option.name} // Display subject name
              isOptionEqualToValue={(option, value) => option._id === value._id} // Match by ID
            />

            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsDialogOpen(true)}
              className="addsubjectButton"
            >
              Add Subject
            </Button>

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
          <Autocomplete
            options={cities}
            onChange={handleCityChange}
            value={selectedCity}
            className="box-input"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search City"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F8FAFC !important",
                    borderRadius: "8px",
                  },
                }}
              />
            )}
          />
        </div>
       
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPlan}
        className="createPlanButton"
        sx={{ marginTop: "16px" }}
      >
        Create Plan
      </Button>
    </Box>
  );
};

export default SearchableDropdown;
