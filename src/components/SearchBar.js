import React, { Component } from "react";
import { connect } from "react-redux";

import {
  changeIntervalInput,
  setIntervalUpdate
} from "./../actions";

class SearchBar extends Component {
  onFormSubmit = async event => {
    event.preventDefault();
    await this.props.setIntervalUpdate(this.props.visibleInterval);
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
    visibleInterval: state.setUpdateInterval.visibleInterval
  };
};
export default connect(
  mapStateToProps,
  { changeIntervalInput, setIntervalUpdate }
)(SearchBar);

//   onChange={e => this.setState({ interval: e.target.value })
