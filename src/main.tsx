import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'
import App from "./App";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App /> 
    </Router>
  </React.StrictMode>
);
