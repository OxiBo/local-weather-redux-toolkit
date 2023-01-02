import React from "react";
import { connect } from "react-redux";

import SearchBar from "./SearchBar";

const UpdateInfo = props => {
  const { isLocationLoading, isWeatherLoading, updatedTime, interval } = props;
  return (
    <div className="update-bar">
      <SearchBar />
      {interval && (
        <div className="updated">
          <p>
            The weather will be updated every{" "}
            {interval === "1" ? "hour" : `${interval} hours`}
          </p>
        </div>
      )}
      <div className="updated">
        <p>
          Updated:
          {isLocationLoading && isWeatherLoading ? (
            <p> Loading... </p>
          ) : (
            updatedTime
          )}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLocationLoading: state.location.isLocationLoading,
    isWeatherLoading: state.weather.isWeatherLoading,
   // updatedTime: state.weather.weatherDetails.updatedTime,
   // interval: state.setUpdateInterval.interval
  };
};

export default connect(mapStateToProps)(UpdateInfo);
