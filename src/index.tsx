import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app";

import {reducer} from "./reducer";

const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
