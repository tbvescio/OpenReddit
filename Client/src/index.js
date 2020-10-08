import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
require('dotenv').config()

axios.defaults.baseURL = process.env.REACT_APP_URL;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
