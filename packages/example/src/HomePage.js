import React, { Component } from 'react';

import Nested from './Nested';

import './HomePage.css';

export default class HomePage extends Component {
  static defaultProps = {
    name: 'world',
    onClick: () => { console.log('clicked') }
  }

  render() {
    return (
      <div className="HomePage">
        <h2 className="HomePage-title">
          Hello {this.props.name}
        </h2>
        <Nested onClick={this.props.onClick} />
      </div>
    );
  }
}
