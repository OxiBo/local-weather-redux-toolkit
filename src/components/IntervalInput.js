import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../store/configureStore';
import { fetchImg } from '../store/configureStore';
import { changeInterval, setIntervalID } from '../store/configureStore';

class IntervalInput extends Component {

  onBlur = async (event) => {
    const {
      changeInterval,
      fetchWeather,
      fetchImg,
      intervalID,
      setIntervalID,
    } = this.props;

    const interval = event.target.value;
    if (!interval) {
      changeInterval('');
      clearTimeout(intervalID);
      setIntervalID(null);
    } else {
      changeInterval(interval);
      const newIntervalID = setInterval(async () => {
        await fetchWeather();
        //updateBackground
        await fetchImg();
        //  document.body.style.backgroundImage = `url(${this.props.backgroundImageUrl})`;
      }, interval * 360000);
      setIntervalID(newIntervalID);
    }
  };

  onChange = (event) => {
    this.props.changeInterval(event.target.value);
  };

  render() {
    return (
      <div>
        <form action="">
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
            // min="1"
            // max="24"
            value={this.props.interval}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <p>hour(s)</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ interval, weather }) => {
  return {
    interval: interval.interval,
    intervalID: interval.intervalID,
    // backgroundImageUrl: weather.weatherDetails.backgroundImageUrl,
    // millisecondsInterval: interval.millisecondsInterval,
  };
};
export default connect(mapStateToProps, {
  fetchWeather,
  fetchImg,
  changeInterval,
  setIntervalID,
})(IntervalInput);

//   onChange={e => this.setState({ interval: e.target.value })
