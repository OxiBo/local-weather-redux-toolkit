import { location } from "../apis/location";
import { weatherInfo } from "../apis/weather";

export const fetchLocation = () => async dispatch => {
  const response = await location();
  if (response.locationError) {
    dispatch({ type: "LOCATION_ERROR" });
  } else {
    dispatch({ type: "FETCH_LOCATION", payload: response });
  }
};

export const fetchWeather = () => async (dispatch, getState) => {
  const {
    latitude,
    longitude
  } = getState().locationDetails.locationDetails.coords;
  const response = await weatherInfo(latitude, longitude);
  if (response.weatherAPIError) {
    dispatch({ type: "WEATHER_FETCH_ERROR" });
  } else {
    dispatch({ type: "FETCH_WEATHER", payload: response });
  }
};

export const changeIntervalInput = interval => {
  return {
    type: "CHANGE_INTERVAL_INPUT",
    visibleInterval: interval
  };
};

export const setIntervalUpdate = interval => {
  return {
    type: "SET_INTERVAL_UPDATE",
    interval
  };
};

export const clearInputInterval = () => {
  return {
    type: "CLEAR_INPUT_SEARCHBAR",
    visibleInterval: ""
  };
};

export const setIntervalID = (intervalID) => {
    return {
        type: "CLEAR_INTERVAL_ID",
        intervalID 
    }
}

// export const fetchQuote = () => async dispatch => {
//     const response = await newQuote();
//     if (response.error) {
//       dispatch({ type: "ERROR", payload: response.error, isLoading: false });
//     } else {
//       dispatch({ type: "FETCH_QUOTE", payload: response });
//     }
//   };
