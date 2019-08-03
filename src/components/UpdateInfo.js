import React from "react";
import { connect } from "react-redux";

import SearchBar from "./SearchBar";

const UpdateInfo = props => {
  const { isLocationLoading, isWeatherLoading, updatedTime, interval } = props;
  return (
    <div>
      <SearchBar />
      {interval && (
        <div>
          <p>
            The weather will be updated every{" "}
            {interval === "1" ? "hour" : `${interval} hours`}
          </p>
        </div>
      )}
      {/* using "==" when checking the condition because don't need strict equality (don't need to compare value and type) */}
      <div className="updated">
        <p>
          {" "}
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
    isLocationLoading: state.locationDetails.isLocationLoading,
    isWeatherLoading: state.weatherDetails.isWeatherLoading,
    updatedTime: state.weatherDetails.weatherDetails.updatedTime,
    interval: state.setUpdateInterval.interval
  };
};

export default connect(mapStateToProps)(UpdateInfo);
