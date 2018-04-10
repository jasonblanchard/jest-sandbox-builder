import React, { Component } from 'react';

export default class Nested extends Component {
  render() {
    return (
      <div className="Nested">
        This is a nested component <button onClick={this.props.onClick}>click me</button>
      </div>
    );
  }
}
