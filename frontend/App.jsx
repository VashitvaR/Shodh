import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar"; // Assuming your Navbar component is exported as default

const App = () => {
  return (
    <Router>
      <Navbar />
    </Router>
  );
};

export default App;
