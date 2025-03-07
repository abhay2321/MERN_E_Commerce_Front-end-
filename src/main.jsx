/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppState from "./Context/AppState.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppState>
    <App />
  </AppState>
);
