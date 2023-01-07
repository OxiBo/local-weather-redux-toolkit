import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultImg from '../gallery/default1.jpg';
import { fetchWeather } from '../store/configureStore';
import { fetchImg } from '../store/configureStore';
import ToggleTemp from './ToggleTemp';
import UpdateInfo from './UpdateInfo';

class WeatherDisplay extends Component {
  async componentDidMount() {
    console.log("weathe container mounted")
    await this.props.fetchWeather();
    await this.props.fetchImg();
    // set background
    document.body.style.backgroundImage = `url(${this.props.backgroundImg})`;
  }

  // https://reactjs.org/docs/react-component.html#componentdidupdate You may call setState() immediately in componentDidUpdate() but note that it must be wrapped in a condition like in the example above, or you’ll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance. If you’re trying to “mirror” some state to a prop coming from above, consider using the prop directly instead. Read more about why copying props into state causes bugs.

  componentDidUpdate(prevProps) {
    // set background
    document.body.style.backgroundImage = `url(${
      this.props.backgroundImg || defaultImg
    })`;

    if (this.props.backgroundImg !== prevProps.backgroundImg) {
      document.body.style.backgroundImage = `url(${this.props.backgroundImg})`;
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
      windSpeed,
    } = this.props.weatherDetails;
    return (
      <main>
        {!this.props.isWeatherLoading && (
          <>
            <div className="weather">
              <div className="container container-top">
                <div className="inline-details">
                  <img id="icon" src={icon} alt={description} />
                </div>

                {temperature && <ToggleTemp />}
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
            <UpdateInfo />
          </>
        )}
      </main>
    );
  }
}

const mapStateToProps = ({ location, weather, backgroundImg, interval }) => {
  return {
    locationDetails: location.locationDetails,
    isWeatherLoading: weather.isWeatherLoading,
    weatherDetails: weather.weatherDetails,
    intervalID: interval.intervalID,
    backgroundImg: backgroundImg.backgroundImg,
  };
};

export default connect(mapStateToProps, { fetchWeather, fetchImg })(
  WeatherDisplay
);
