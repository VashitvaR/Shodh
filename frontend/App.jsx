import React, { useState } from "react";
import { NextUIProvider, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./Dashboard";
import Form from "./Form";
import Marquee from "react-fast-marquee";

// Define the Shodh heading component
const ShodhHeading = () => (
  <header className=" text-black py-16 w-[80vw] h-[100vh] flex justify-center  items-center ">
    <Marquee
      gradient={false}
      speed={40}
      autoFill={true}
      pauseOnHover={true}
      direction="left"
      className="text-2xl uppercase bg-yellow-500 text-black p-2 font-bold  opacity-[0.8] absolute top-0 "
    >
      &nbsp; Mutual Funds are subject to market risks, read all scheme related
      documents carefully.
    </Marquee>
    <div className="  text-center flex justify-center h-[20vh] items-center	 ">
      <div>
        <h1 className="text-8xl font-bold uppercase">Welcome to Shodh</h1>
        <p className="mt-4 text-lg text-gray-500">
          Revolutionizing Asset Management with AI
        </p>

        <Button
          variant="outlined"
          color="primary"
          //yellow black theme
          className="mt-8 w-50 bg-yellow-500 text-black text-xl"
          onClick={() => {
            //scroll to the form

            document
              .getElementById("main")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Try Now !!!
        </Button>
      </div>
    </div>
  </header>
);

// Define the Shodh footer component
const ShodhFooter = () => (
  <footer className="text-center text-sm text-gray-500 mt-8 mb-8">
    Statement 10: Revolutionizing Wealth Management: Insights and Predictions
    for Mutual Funds
  </footer>
);

const App = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <NextUIProvider>
      <div>
        {/* Render the Shodh heading */}
        <ShodhHeading />

        <nav id="main" className="flex items-center justify-center mb-4 pt-4">
          <p
            className={`text-2xl cursor-pointer mr-4 ${
              activeComponent === "Dashboard"
                ? " bg-yellow-500 text-black p-2 rounded-lg"
                : "bg-yellow-200 text-black hover:text-gray-700 p-2 rounded-lg opacity-[0.6]"
            }`}
            onClick={() => handleClick("Dashboard")}
          >
            Screener
          </p>
          <p className="text-2xl text-gray-500">/</p>
          <p
            className={`text-2xl cursor-pointer ml-4 ${
              activeComponent === "Form"
                ? " bg-yellow-500 text-black p-2 rounded-lg"
                : " bg-yellow-200 text-black hover:text-gray-700 p-2 rounded-lg opacity-[0.6]"
            }`}
            onClick={() => handleClick("Form")}
          >
            AI Model
          </p>
        </nav>

        <AnimatePresence mode="wait">
          {activeComponent === "Dashboard" && (
            <motion.div
              className="flex flex-col gap-4 p-8 rounded-lg  bg-white w-[100%] h-[100vh]"
              key="Dashboard"
              initial={{ opacity: 0, x: "-100px" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100px" }}
            >
              <Dashboard />
            </motion.div>
          )}
          {activeComponent === "Form" && (
            <motion.div
              key="Form"
              initial={{ opacity: 0, x: "100px" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100px" }}
              className="flex flex-col gap-4 p-8 justify-center w-[100%] "
            >
              <Form />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render the Shodh footer */}
        <ShodhFooter />
      </div>
    </NextUIProvider>
  );
};

export default App;
