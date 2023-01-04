import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../store/configureStore';
import { changeInterval } from '../store/configureStore';
import { setIntervalUpdate, setIntervalID } from './../actions';

class SearchBar extends Component {
  onFormSubmit = async (event) => {
    event.preventDefault();
    const { setIntervalUpdate, visibleInterval, fetchWeather } = this.props;

    await setIntervalUpdate(visibleInterval);

    const { millisecondsInterval } = this.props;

    const intervalID = setInterval(async () => {
      await fetchWeather();

      //updateBackground
      document.body.style.backgroundImage = `url(${this.props.backgroundImageUrl})`;
    }, millisecondsInterval);
    setIntervalID(intervalID);
  };

  onChange = (event) => {
    console.log( event.target.value)
    this.props.changeInterval(event.target.value);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} action="">
          <label htmlFor="interval">
            <p>Update every</p>
          </label>
          <input
            type="number"
            id="interval"
            name="interval"
            required
            placeholder="Enter interval in hours"
            autoComplete="off"
            min="1"
            max="24"
            value={this.props.visibleInterval}
            onChange={this.onChange}
          />
          <p>hour(s)</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ interval, weather }) => {
  return {
    visibleInterval: interval.visibleInterval,
    backgroundImageUrl: weather.weatherDetails.backgroundImageUrl,
    millisecondsInterval: interval.millisecondsInterval,
  };
};
export default connect(mapStateToProps, {
  fetchWeather,
  changeInterval,
  setIntervalUpdate,
  setIntervalID,
})(SearchBar);

//   onChange={e => this.setState({ interval: e.target.value })
