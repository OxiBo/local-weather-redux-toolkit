import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLocation } from "./../actions";
import "./styles.scss";
import WeatherDisplay from "./WeatherDisplay";
import UpdateInfo from "./UpdateInfo";
// import defaultImg from "../gallery/default1.jpg";
class App extends Component {
  async componentDidMount() {
    await this.props.fetchLocation();
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
          </header>
          {isLocationLoading || isWeatherLoading ? (
            <h3> Loading... </h3>
          ) : locationError ? (
            <div className="errorMessage">{locationError}</div>
          ) : this.props.weatherAPIError ? (
            <div className="errorMessage">{weatherAPIError}</div>
          ) : (
            <UpdateInfo />
          )}

          {!isLocationLoading && !locationError && !weatherAPIError && (
            <WeatherDisplay />
          )}
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
    weatherAPIError: state.weatherDetails.weatherAPIError
  };
};
export default connect(
  mapStateToProps,
  { fetchLocation }
)(App);
