"use client";
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const DashboardForm = ({ onSubmit }) => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields here
    if (selectedOption1 && selectedOption2 && category && amount && year) {
      onSubmit({
        selectedOption1,
        selectedOption2,
        category,
        amount,
        year,
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Dropdown 1 */}
      <FormControl fullWidth variant="outlined">
        <InputLabel>Select Option 1</InputLabel>
        <Select
          value={selectedOption1}
          onChange={(e) => setSelectedOption1(e.target.value)}
          label="Select Option 1"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Option 1">Option 1</MenuItem>
          <MenuItem value="Option 2">Option 2</MenuItem>
          <MenuItem value="Option 3">Option 3</MenuItem>
        </Select>
      </FormControl>

      {/* Dropdown 2 */}
      <FormControl fullWidth variant="outlined">
        <InputLabel>Select Option 2</InputLabel>
        <Select
          value={selectedOption2}
          onChange={(e) => setSelectedOption2(e.target.value)}
          label="Select Option 2"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Option A">Option A</MenuItem>
          <MenuItem value="Option B">Option B</MenuItem>
          <MenuItem value="Option C">Option C</MenuItem>
        </Select>
      </FormControl>

      {/* Category dropdown */}
      <FormControl fullWidth variant="outlined">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="">None</MenuItem>
          {/* Add your category options here */}
        </Select>
      </FormControl>

      {/* Amount input */}
      <div>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Year input */}
      <div>
        <input
          type="number"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default DashboardForm;
