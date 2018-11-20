/** @format */
import React from "react";
import { AppRegistry, YellowBox } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./src/App";
import { name as appName } from "./app.json";
import rootReducer from "./src/reducers";

YellowBox.ignoreWarnings(["Require cycle"]);
console.disableYellowBox = true;
/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer);
/* eslint-enable */
const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => AppContainer);
