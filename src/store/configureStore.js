import { configureStore } from "@reduxjs/toolkit";
import { intervalReducer } from "./slices/intervalSlice";
import { locationReducer } from "./slices/locationSlice";
import { weatherReducer } from "./slices/weatherSlice";


export const store = configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
    interval: intervalReducer
  }
})

export * from './slices/intervalSlice'
export * from './thunk/fetchLocation'
export * from './thunk/fetchWeather'


// // import { fetchLocationReducer, fetchWeatherReducer, setUpdateIntervalReducer, toggleTempReducer } from "./../reducers";
// // setup redux extension https://github.com/zalmoxisus/redux-devtools-extension#usage (1.2  Advanced store setup)

// export default () => {
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//   const store = createStore(
//     combineReducers({
//       locationDetails: fetchLocationReducer,
//       weatherDetails: fetchWeatherReducer,
//       setUpdateInterval: setUpdateIntervalReducer,
//       // toggleTemp: toggleTempReducer
//     }),
//     composeEnhancers(applyMiddleware(thunk))
//   );
//   return store;
// };
