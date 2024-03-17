import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <div className="w-[100%]   flex items-start justify-center bg-yellow-100 light text-foreground   ">
        <App />
      </div>
    </NextUIProvider>
  </React.StrictMode>
);
