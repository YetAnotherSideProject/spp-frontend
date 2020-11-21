import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configure } from "mobx";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  observableRequiresReaction: true,
});

ReactDOM.render(<App />, document.getElementById("react-root"));

if (module.hot) {
  module.hot.accept();
}
