import React, { useState } from "react";
import Navbar from "./Navbar"; // Import your Navbar component

const App = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      {/* Render only the Navbar component */}
      <Navbar activeComponent={activeComponent} handleClick={handleClick} />
    </div>
  );
};

export default App;
