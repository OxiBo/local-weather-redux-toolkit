import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchWeather,
  changeIntervalInput,
  setIntervalUpdate,
  setIntervalID
} from "./../actions";

class SearchBar extends Component {
  onFormSubmit = async event => {
    event.preventDefault();
    const { setIntervalUpdate, visibleInterval, fetchWeather } = this.props;
    await setIntervalUpdate(visibleInterval);

    const intervalID = setInterval(async () => {
      await fetchWeather();

      //updateBackground
      document.body.style.backgroundImage = `url(${
        this.props.backgroundImageUrl
      })`;
    }, this.props.millisecondsInterval);
    setIntervalID(intervalID);
  };

  onChange = event => {
    // event.preventDefault(); // onChange even is not cancelable that is why this function will not work preventDefault()
    this.props.changeIntervalInput(event.target.value);
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

const mapStateToProps = state => {
  return {
    visibleInterval: state.setUpdateInterval.visibleInterval,
    backgroundImageUrl: state.weatherDetails.weatherDetails.backgroundImageUrl,
    millisecondsInterval: state.setUpdateInterval.millisecondsInterval
  };
};
export default connect(
  mapStateToProps,
  { fetchWeather, changeIntervalInput, setIntervalUpdate, setIntervalID }
)(SearchBar);

//   onChange={e => this.setState({ interval: e.target.value })
