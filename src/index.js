import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {Settings} from "./consts.js";

ReactDOM.render(
    <App
      errorsCount = {Settings.ERRORS_COUNT}
    />,
    document.querySelector(`#root`)
);
