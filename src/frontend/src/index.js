import React from "react";
import ReactDOM from "react-dom";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";
import App from "./App";
import "./index.css";

const stytch = new StytchUIClient(process.env.REACT_APP_STYTCH_PUBLIC_TOKEN);

const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StytchProvider stytch={stytch}>
      <App />
    </StytchProvider>
  </React.StrictMode>,
  root
);
