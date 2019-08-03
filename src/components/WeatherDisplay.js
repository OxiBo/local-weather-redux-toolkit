import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLocation, fetchWeather, setIntervalID } from "./../actions";
import ToggleTemp from "./ToggleTemp";

class WeatherDisplay extends Component {
  async componentDidMount() {
    await this.props.fetchLocation();
    await this.props.fetchWeather();
    // // set background
    // document.body.style.backgroundImage = `url(${
    //   this.props.weatherDetails.backgroundImageUrl
    // })`;
  }

  // https://reactjs.org/docs/react-component.html#componentdidupdate You may call setState() immediately in componentDidUpdate() but note that it must be wrapped in a condition like in the example above, or you’ll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance. If you’re trying to “mirror” some state to a prop coming from above, consider using the prop directly instead. Read more about why copying props into state causes bugs.

  componentDidUpdate(prevProps) {
    if (this.props.millisecondsInterval !== prevProps.millisecondsInterval) {
      const {
        millisecondsInterval,
        locationDetails,
        weatherDetails,
        setIntervalID
      } = this.props;

      const intervalID = setInterval(async () => {
        await this.props.fetchWeather(
          locationDetails.coords.longitude,
          locationDetails.coords.latitude
        );

        //updateBackground
        document.body.style.backgroundImage = `url(${
          weatherDetails.backgroundImageUrl
        })`;
      }, millisecondsInterval);
      setIntervalID(intervalID);
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
    clearInterval(this.props.intervalID);
  }
  render() {
    const { city, region, country } = this.props.locationDetails;

    const {
      icon,
      temperature,
      humidity,
      description,
      windSpeed
    } = this.props.weatherDetails;

    return (
      <main>
        {this.props.locationError ? (
          <div className="errorMessage">{this.props.locationError}</div>
        ) : this.props.weatherAPIError ? (
          <div className="errorMessage">{this.props.weatherAPIError}</div>
        ) : (
          <div className="weather">
            <div className="container container-top">
              <div className="inline-details">
                <img id="icon" src={icon} alt={description} />
              </div>
              {/* wrap the toggle component in "{temperature && }" to be able to pass props which comes from api call*/}
              {temperature && <ToggleTemp temp={temperature} />}
            </div>
            <div className="container">
              <div className="details" id="location">
                {`${city}, ${region}, ${country}`}
              </div>
              <div className="details" id="summary">
                {description}
              </div>
              <div className="details" id="windSpeed">
                WS {windSpeed} m/s
              </div>
              <div className="details" id="humidity">
                humidity {humidity}%
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    locationDetails: state.locationDetails.locationDetails,
    locationError: state.locationDetails.locationError,
    weatherDetails: state.weatherDetails.weatherDetails,
    weatherAPIError: state.weatherDetails.weatherAPIError,
    millisecondsInterval: state.setUpdateInterval.millisecondsInterval,
    intervalID: state.setUpdateInterval.intervalID
  };
};

export default connect(
  mapStateToProps,
  { fetchLocation, fetchWeather, setIntervalID }
)(WeatherDisplay);
