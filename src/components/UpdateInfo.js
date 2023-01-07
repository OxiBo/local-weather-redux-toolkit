import React from 'react';
import { connect } from 'react-redux';
import IntervalInput from './IntervalInput';

const UpdateInfo = (props) => {
  const { isLocationLoading, isWeatherLoading, updatedTime, interval } = props;
  return (
    <div className="update-bar">
      <IntervalInput />
      {interval && (
        <div className="updated">
          <p>
            The weather will be updated every
            {interval === '1' ? 'hour' : `${interval} hours`}
          </p>
        </div>
      )}
      <div className="updated">
        <p>
          Updated:
          {isLocationLoading && isWeatherLoading ? (
            <p> Loading... </p>
          ) : (
           <span>{updatedTime}</span> 
          )}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ interval, location, weather }) => {
  return {
    isLocationLoading: location.isLocationLoading,
    isWeatherLoading: weather.isWeatherLoading,
    updatedTime: weather.weatherDetails.updatedTime,
    interval: interval.interval,
  };
};

export default connect(mapStateToProps)(UpdateInfo);
