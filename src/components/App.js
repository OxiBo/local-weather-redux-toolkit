import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { fetchLocation } from "./../actions";
import './styles.scss';
import WeatherDisplay from './WeatherDisplay';

import { fetchLocation } from '../store/configureStore';
import { location } from '../apis/location';

class App extends Component {
  componentDidMount() {
    this.props.fetchLocation();
  }

  render() {
    const { isLocationLoading, locationError, isLocationLoaded } = this.props;
    console.log(locationError);
    console.log(isLocationLoading);
    console.log(!isLocationLoading && !locationError);
    return (
      <div className="mainContainer">
        <div className="main">
          <header>
            <h1>Local weather APP</h1>
            <hr />
          </header>
          {isLocationLoading && <h3>Loading...</h3>}
          {locationError && <div className="errorMessage">{locationError}</div>}
          {isLocationLoaded && <WeatherDisplay />}
        </div>

        <footer>
          <p id="copyright">Written and coded by OxiBo, 2019</p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({ location }) => {
  return {
    isLocationLoading: location.isLocationLoading,
    locationError: location.locationError,
    // workaround for a small app
    isLocationLoaded:
      location.locationDetails.coords.latitude &&
      location.locationDetails.coords.latitude,
  };
};
export default connect(mapStateToProps, { fetchLocation })(App);
