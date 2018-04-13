import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { getRegistry } from 'jestbox-builder';

// TODO: Make this configurable and do it automatically
const context = require.context('./tests', true, /\.test\.js$/);
context.keys().forEach(module => context(module));

import { Sandbox } from 'jestbox-web';

import HomePage from './HomePage';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/jestbox" render={() => <Sandbox registry={getRegistry()} basePath="/jestbox" />} />
        </div>
      </Router>
    );
  }
}
