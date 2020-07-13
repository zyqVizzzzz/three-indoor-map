import React from "react";
import ReactDOM from "react-dom";
import { StoreContext, makeStore } from "reducers/Store";
import App from "./App";

import "style/normalized.css";

const store = makeStore();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);
