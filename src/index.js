import React from "react";
import ReactDOM from "react-dom";
import { Grommet } from "grommet";

import App from "./App";
import { StateProvider } from "./store/store";
import { theme } from "./themes";
import "./css/noisly.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme}>
      <StateProvider>
        <App />
      </StateProvider>
    </Grommet>
  </React.StrictMode>,
  document.getElementById("root")
);
