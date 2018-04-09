import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './App';
import Sandbox from './Sandbox';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route exact path="/sandbox" component={Sandbox} />
        </div>
      </Router>
    );
  }
}
