import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLocation, fetchWeather } from "./../actions";
import "./styles.scss";
import WeatherDisplay from "./WeatherDisplay";
import UpdateInfo from "./UpdateInfo";

class App extends Component {

  componentDidMount() {
    // set background
    document.body.style.backgroundImage = `url(${this.props.backgroundImageUrl}`;
  }

  render() {
    const {
      isLocationLoading,
      isWeatherLoading,
      locationError,
      weatherAPIError
    } = this.props;
    return (
      <div className="mainContainer">
        <div className="main">
          <header>
            <h1>Local weather APP</h1>
            <hr />

            {isLocationLoading || isWeatherLoading ? (
              <h3> Loading... </h3>
            ) : locationError || weatherAPIError ? (
              false
            ) : (
              <UpdateInfo />
            )}
          </header>

          <WeatherDisplay />
        </div>

        <footer>
          <p id="copyright">Written and coded by OxiBo, 2019</p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLocationLoading: state.locationDetails.isLocationLoading,
    locationError: state.locationDetails.locationError,
    isWeatherLoading: state.weatherDetails.isWeatherLoading,
    weatherAPIError: state.weatherDetails.weatherAPIError,
    backgroundImageUrl: state.weatherDetails.weatherDetails.backgroundImageUrl
  };
};
export default connect(
  mapStateToProps,
  { fetchLocation, fetchWeather }
)(App);