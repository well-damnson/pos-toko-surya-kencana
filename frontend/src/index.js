import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import "./App.css";
import App from "./view/newsMemberPoin";
import * as serviceWorker from "./serviceWorker";

import Navigator from "./navigator";
import { Provide } from "./wrapper";
let ApplicationWrapper = (
  <Provide>
    <Navigator />
  </Provide>
);

ReactDOM.render(ApplicationWrapper, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
