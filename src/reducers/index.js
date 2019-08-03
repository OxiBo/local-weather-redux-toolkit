import defaultImg from "../gallery/default1.jpg";

const locationReducerDefaultState = {
  locationDetails: {
    city: "",
    region: "",
    country: "",
    coords: {
      latitude: null,
      longitude: null
    }
  },
  locationError: "",
  isLocationLoading: true,
  isWeatherLoading: true
};

export const fetchLocationReducer = (
  state = locationReducerDefaultState,
  action
) => {
  switch (action.type) {
    case "FETCH_LOCATION":
      const { coords, city, region, country } = action.payload;
      return {
        ...state,
        locationDetails: {
          coords: {
            latitude: coords.latitude,
            longitude: coords.longitude
          },
          city,
          region,
          country
        },
        isLocationLoading: false,
        locationError: ""
      };
    case "LOCATION_ERROR":
      return {
        ...state,
        isLocationLoading: false,
        isWeatherLoading: false,
        locationError: "Location information is unavailable"
      };
    default:
      return state;
  }
};

const weatherReducerDefaultState = {
  weatherDetails: {
    icon: "",
    temperature: null,
    humidity: null,
    description: "",
    additionalDescription: "",
    windSpeed: "",
    apiID: null,
    weatherAPIError: "",
    updatedTime: "",
    backgroundImageUrl: defaultImg
  },
  weatherAPIError: "",
  isWeatherLoading: true
};

export const fetchWeatherReducer = (
  state = weatherReducerDefaultState,
  action
) => {
  switch (action.type) {
    case "FETCH_WEATHER":
      const {
        icon,
        temperature,
        humidity,
        description,
        additionalDescription,
        windSpeed,
        apiID,
        weatherAPIError,
        updatedTime,
        backgroundImageUrl
      } = action.payload;
      return {
        ...state,
        weatherDetails: {
          icon,
          temperature,
          humidity,
          description,
          additionalDescription,
          windSpeed,
          apiID,
          weatherAPIError,
          updatedTime,
          backgroundImageUrl
        },
        isWeatherLoading: false
      };
    case "WEATHER_FETCH_ERROR":
      return {
        ...state,
        isLocationLoading: false,
        isWeatherLoading: false,
        weatherAPIError: "Failed to load local weather."
      };
    default:
      return state;
  }
};

const setUpdateIntervalDefaultState = {
  interval: "",
  visibleInterval: "",
  millisecondsInterval: null,
  intervalID: ""
};

export const setUpdateIntervalReducer = (
  state = setUpdateIntervalDefaultState,
  action
) => {
  switch (action.type) {
    case "CHANGE_INTERVAL_INPUT":
      return {
        ...state,
        visibleInterval: action.visibleInterval
      };
    case "SET_INTERVAL_UPDATE":
      return {
        ...state,
        interval: action.interval,
        visibleInterval: "",
        millisecondsInterval: action.interval * 360000
      };

    case "CLEAR_INTERVAL_ID":
      return {
        ...state,
        intervalID: action.intervalID
      };
    default:
      return state;
  }
};
