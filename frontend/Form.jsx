import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

import axios from "axios";

const Form = ({ onSubmit }) => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const [responseData, setResponseData] = useState(null); // Initialize as null

  const [amount, setAmount] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    setSubmit(true);
    setLoading(true); // Set loading state when submitting form
    e.preventDefault();
    // Validate form fields here
    if (selectedOption1 && selectedOption2 && amount && year) {
      try {
        const queryString = new URLSearchParams({
          amc: selectedOption1,
          category: selectedOption2,
          amount_invested: amount,
          tenure: year,
        }).toString();
        const response = await axios.get(
          `http://127.0.0.1:5000/getrecommendation?${queryString}`
        );
        console.log(response.data);
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Reset loading state after data is fetched
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg  bg-white w-[100%] h-[100%]   pb-5 ">
      {" "}
      <h1 className="text-[42px] font-bold pl-8  text-center m-5 ">
        Recommendation
      </h1>
      <div className="flex justify-between flex-col pl-2 pr-10">
        <form
          onSubmit={handleSubmit}
          className=" w-[100%] flex flex-col gap-4  rounded-l  ml-5 mr-5  "
        >
          <FormControl className="mb-2" fullWidth variant="outlined">
            <TextField
              id="amc-input"
              value={selectedOption1}
              onChange={(e) => setSelectedOption1(e.target.value)}
              label="AMC"
              variant="outlined"
              required
              InputProps={{ classes: { input: "text-gray-700" } }} // Set input text color
            />
          </FormControl>

          {/* Input 2 */}
          <FormControl className="mb-2" fullWidth variant="outlined">
            <TextField
              id="category-input"
              value={selectedOption2}
              onChange={(e) => setSelectedOption2(e.target.value)}
              label="Category"
              variant="outlined"
              required
              InputProps={{ classes: { input: "text-gray-700" } }} // Set input text color
            />
          </FormControl>

          {/* Amount input */}
          <TextField
            className="mb-2"
            label="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />

          {/* Year input */}
          <TextField
            className="mb-2"
            label="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />

          <Button
            type="submit"
            variant="outlined"
            style={{
              color: "black",
              borderColor: "black",
              backgroundColor: "#eab308",
            }}
          >
            Submit
          </Button>
        </form>

        {submit && loading && (
          <div className="text-center mt-4">Loading...</div>
        )}
{submit && !loading && responseData && (
          <div className="flex flex-col gap-4 rounded-lg   w-[100%]  ml-5 mr-5 mt-10 mb-10  ">
            <h2 className="text-2xl font-bold mb-4">Stats</h2>
            {/* Display predictions */}
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(responseData.predictions).map((key) => (
                <div key={key} className="p-4 bg-green-200 rounded-xl">
                  <div className="font-bold text-xl text-gray-800 leading-none uppercase">
                    {key.replace(/_/g, " ")}
                  </div>
                  <div className="mt-5">
                    {responseData.predictions[key].map((value, index) => (
                      <div key={index}>{value}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Display recommendations */}
            <div className="flex flex-wrap gap-10 mt-4">
              {responseData.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="p-4 bg-purple-200 rounded-xl text-gray-800"
                >
                  <div className="font-bold text-xl leading-none">
                    {recommendation["Scheme Name"]}
                  </div>
                  <div className="mt-2">
                    {Object.entries(recommendation).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-bold">{key}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;