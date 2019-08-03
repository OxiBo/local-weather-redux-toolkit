
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";


import configureStore from "./store/configureStore";
import App from "./components/App";

const store = configureStore();

// console.log(store.getState())

ReactDOM.render(
<Provider store={store}><App /></Provider>
, document.querySelector("#root"));