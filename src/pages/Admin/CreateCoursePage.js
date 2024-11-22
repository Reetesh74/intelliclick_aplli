import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import "../../styles/admin.css";
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
  const [subjects, setSubjects] = useState(["Math", "Science"]);
  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState(["Mp", "Up", "Bihar"]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For handling the open state of the menu
  const [selectedOption, setSelectedOption] = useState(null); // For storing the selected option

  // Open the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle the button click to select Discount or Percentage
  const handleButtonClick = (option) => {
    setSelectedOption(option);
    handleMenuClose(); // Close the menu after selecting
  };

  // Handle the change for price type (Fixed or Range)
  const handlePriceChange = (event, value) => {
    setSelectedPrice(value); // Update selected price type
  };

  // Handle the change for states
  const handleStateChange = (event, value) => {
    if (value === "Add State") {
      handleAddState(); // Trigger custom action for adding a state
    } else {
      setSelectedState(value); // Update selected state
    }
  };

  // Add a new state to the list
  const handleAddState = () => {
    const newState = prompt("Enter the name of the new state:");
    if (newState && !states.includes(newState)) {
      setStates((prevStates) => [...prevStates, newState]); // Add new state to list
      setSelectedState(newState); // Set the newly added state as selected
    } else if (newState) {
      alert("This state already exists!");
    }
  };

  // Handle the change for subjects (similar to other dropdowns)
  const handleSubjectChange = (event, value) => {
    if (value === "Custom Subject") {
      handleAddSubject(); // Trigger custom action for adding a subject
    } else {
      setSelectedSubject(value);
    }
  };

  // Handle the change for boards (similar to other dropdowns)
  const handleBoardChange = (event, value) => {
    if (value === "Add Board") {
      handleAddBoard(); // Trigger custom action for adding a board
    } else {
      setSelectedBoard(value); // Update selected board
    }
  };

  // Add a new subject to the list
  const handleAddSubject = () => {
    const newSubject = prompt("Enter the name of the new subject:");
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects((prevSubjects) => [...prevSubjects, newSubject]); // Add new subject to list
      setSelectedSubject(newSubject);
    } else if (newSubject) {
      alert("This subject already exists!");
    }
  };

  // Add a new board to the list
  const handleAddBoard = () => {
    const newBoard = prompt("Enter the name of the new board:");
    if (newBoard && !boards.includes(newBoard)) {
      setBoards((prevBoards) => [...prevBoards, newBoard]); // Add new board to list
      setSelectedBoard(newBoard); // Set the newly added board as selected
    } else if (newBoard) {
      alert("This board already exists!");
    }
  };

  // Handle other fields (Category, Class, Validity)
  const handleCategoryChange = (event, value) => {
    if (value === "Add Course") {
      handleAddCourse(); // Trigger custom action
    } else {
      setSelectedCategory(value);
    }
  };

  // Add a new course to the list
  const handleAddCourse = () => {
    const newCourse = prompt("Enter the name of the new course:");
    if (newCourse && !categories.includes(newCourse)) {
      setCategories((prevCategories) => [...prevCategories, newCourse]);
      setSelectedCategory(newCourse);
    } else if (newCourse) {
      alert("This course already exists!");
    }
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
          <Autocomplete
            options={["Add Course", ...categories]}
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="box-input"
            // sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search or Add Course"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {option === "Add Course" ? (
                  <Typography color="primary" fontWeight="bold">
                    + {option}
                  </Typography>
                ) : (
                  option
                )}
              </li>
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === "Add Course"
            }
            filterOptions={(options, state) => options}
          />
          {/* Class Dropdown */}
          <Autocomplete
            options={["Add Class", ...classes]}
            onChange={handleClassChange}
            value={selectedClass}
            className="box-input"
            renderInput={(params) => (
              <TextField {...params} placeholder="Search or Add Class"  sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}/>
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
            options={["Add State", ...states]}
            onChange={handleStateChange}
            value={selectedState}
            className="box-input"
            renderInput={(params) => (
              <TextField {...params} placeholder="Search or Add State"  sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}/>
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
              <TextField {...params} placeholder="Search or Add Board"  sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}/>
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
              <TextField {...params} placeholder="Select or Add Validity"  sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}/>
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
          {/* Subject Dropdown */}
          <Autocomplete
            options={["Custom Subject", ...subjects]} // Add "Custom Subject" at the top of options
            onChange={handleSubjectChange} // Handle selection
            value={selectedSubject} // Controlled value
            className="box-input"
            renderInput={(params) => (
              <TextField {...params} placeholder="Select or Add Subject"  sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}/>
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
          <Autocomplete
            options={["Fixed Price", "Range Price"]}
            onChange={handlePriceChange}
            value={selectedPrice}
            className="box-input"
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Price Type"  sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }} />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Typography fontWeight="bold">{option}</Typography>
              </li>
            )}
            isOptionEqualToValue={(option, value) => option === value}
            filterOptions={(options, state) => options}
          />
          <Autocomplete
            options={["Select Coupon Type"]}
            value={selectedOption || ""}
            onChange={(event, newValue) => setSelectedOption(newValue)}
            className="box-input"
            renderInput={(params) => (
              <TextField
                {...params}
                onClick={handleMenuOpen} // Open menu when clicked
                placeholder="Select Coupon Type"
                sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
              />
            )}
          />

          {/* Custom Menu with Buttons */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)} // Open the menu if anchorEl is set
            onClose={handleMenuClose} // Close the menu
          >
            <MenuItem onClick={() => handleButtonClick("Discount")}>
              <Button variant="contained" color="primary" fullWidth>
                Discount
              </Button>
            </MenuItem>
            <MenuItem onClick={() => handleButtonClick("Percentage")}>
              <Button variant="contained" color="secondary" fullWidth>
                Percentage
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Box>
  );
};

export default SearchableDropdown;
