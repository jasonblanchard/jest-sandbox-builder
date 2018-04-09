import React, { Component } from 'react';

import Nested from './Nested';

import './App.css';

export default class App extends Component {
  static defaultProps = {
    name: 'world',
    onClick: () => { console.log('clicked') }
  }

  render() {
    return (
      <div className="App">
        <h2 className="App-title">
          Hello {this.props.name}
        </h2>
        <Nested onClick={this.props.onClick} />
      </div>
    );
  }
}
