import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { getRegistry } from 'jest-sandbox-builder';

// TODO: Make this configurable and do it automatically
const context = require.context('./tests', true, /\.test\.js$/);
context.keys().forEach(module => context(module));

import { Sandbox } from 'web-sandbox';

import HomePage from './HomePage';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/sandbox" render={() => <Sandbox registry={getRegistry()} />} />
        </div>
      </Router>
    );
  }
}
