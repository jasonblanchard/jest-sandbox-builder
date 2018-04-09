import React, { Component } from 'react';

import { factory } from './tests/App.test.js';

export default class Sandbox extends Component {
  render() {
    return (
      <div>
        <h1>sandbox</h1>
        {factory()}
      </div>
    );
  }
}
