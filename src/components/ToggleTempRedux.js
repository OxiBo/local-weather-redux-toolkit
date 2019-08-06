import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleTemperature } from "./../actions";

class ToggleTemp extends Component {

  render() {
    const {displayTemp, unit, toggleTemperature } = this.props; 
    return (
      <div className="container-temp">
        <div className="inline-details" id="temp">
          {displayTemp || this.props.temperature.toFixed(1)}
        </div>
        <div
          className="inline-details"
          onClick={() => toggleTemperature()}
        >
          <div id="degrees">{unit}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
 
  return {
    temperature: state.weatherDetails.weatherDetails.temperature,
    displayTemp: state.toggleTemp.toggleTemp.displayTemp,
    fahrenheit: state.toggleTemp.toggleTemp.fahrenheit,
    unit: state.toggleTemp.toggleTemp.unit
  };
};

export default connect(
  mapStateToProps,
  { toggleTemperature }
)(ToggleTemp);
