import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

const Form = ({ onSubmit }) => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [submit, setsubmit] = useState(false);

  const [amount, setAmount] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    setsubmit(true);
    e.preventDefault();
    // Validate form fields here
    if (selectedOption1 && selectedOption2 && amount && year) {
      try {
        const queryString = new URLSearchParams({
          selectedOption1,
          selectedOption2,
          amount,
          year,
        }).toString();
        const response = await axios.get(`/api/data?${queryString}`);
        onSubmit(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg  bg-white w-[100%] h-[100%]   ">
      {" "}
      <h1 className="text-[42px] font-bold pl-8  text-center m-5 ">
        Recommendation
      </h1>
      <div className="flex justify-between">
        <form
          onSubmit={handleSubmit}
          className=" w-[50%] flex flex-col gap-4  rounded-l  ml-5 mr-5  "
        >
          {/* Dropdown 1 */}
          <FormControl className=" mb-2" fullWidth variant="outlined">
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
          <FormControl className=" mb-2" fullWidth variant="outlined">
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

          {/* Amount input */}

          <TextField
            className=" mb-2"
            label="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            margin="dense"
          />

          {/* Year input */}

          <TextField
            className=" mb-2"
            label="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            fullWidth
            margin="dense"
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
        {!submit && (
          <div className="flex flex-col gap-4 rounded-lg   w-[50%]  ml-5 mr-5  ">
            <div class="grid ">
              <div>
                <h2 class="text-2xl font-bold mb-4">Stats</h2>

                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-2">
                    <div class="p-4 bg-green-200 rounded-xl">
                      <div class="font-bold text-xl text-gray-800 leading-none">
                        Good day, Kristin
                      </div>
                      <div class="mt-5">
                        <button
                          type="button"
                          class="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                        >
                          Start tracking
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 bg-yellow-200 rounded-xl text-gray-800">
                    <div class="font-bold text-2xl leading-none">20</div>
                    <div class="mt-2">Tasks finished</div>
                  </div>
                  <div class="p-4 bg-yellow-200 rounded-xl text-gray-800">
                    <div class="font-bold text-2xl leading-none">5,5</div>
                    <div class="mt-2">Tracked hours</div>
                  </div>
                  <div class="col-span-2">
                    <div class="p-4 bg-purple-200 rounded-xl text-gray-800">
                      <div class="font-bold text-xl leading-none">
                        Your daily plan
                      </div>
                      <div class="mt-2">5 of 8 completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
