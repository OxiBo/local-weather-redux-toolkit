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
    backgroundImageUrl: ""
  },
  weatherAPIError: "",
  isWeatherLoading: false
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
    case "FETCH_WEATHER_ERROR":
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
  intervalID: null
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

// const defaultToggleTempReducer = {
//   toggleTemp: {
//     displayTemp: "",
//     fahrenheit: false,
//     unit: "\u2103"
//   }
// };


// // I prefer a ToggleTemp component with it's own state and toggle function
// export const toggleTempReducer = (state = defaultToggleTempReducer, action) => {
//   switch (action.type) {
//     case "GET_FAHRENHEIT":
//       return {
//         ...state,
//         toggleTemp: {
//           displayTemp: (action.temp * 1.8 + 32).toFixed(2),
//           fahrenheit: !action.fahrenheit,
//           unit: "\u2109"
//         }
       
//       };

//     case "GET_CELSIUS":
//       return {
//         ...state,
//         toggleTemp: {
//           displayTemp: action.temp.toFixed(1),
//         fahrenheit: !action.fahrenheit,
//         unit: "\u2103"
//         }
        
//       };
//     default:
//       return state;
//   }
// };
