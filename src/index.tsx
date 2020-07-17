import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";

import {Settings} from "./consts";
import questions from "./mocks/questions";

ReactDOM.render(
    <App
      errorsCount={Settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.querySelector(`#root`)
);
