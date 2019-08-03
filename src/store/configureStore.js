import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { fetchLocationReducer, fetchWeatherReducer, setUpdateIntervalReducer } from "./../reducers";

// setup redux extention https://github.com/zalmoxisus/redux-devtools-extension#usage (1.2  Advanced store setup)

export default () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    combineReducers({
      locationDetails: fetchLocationReducer,
      weatherDetails: fetchWeatherReducer,
      setUpdateInterval: setUpdateIntervalReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
