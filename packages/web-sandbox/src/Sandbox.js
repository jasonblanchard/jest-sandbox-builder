import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Sandbox extends Component {
  static defaultProps = {
    registry: {}
  }
  
  constructor(props) {
    super(props);
    
    this._stack = [];
    this._basePath = window.location.pathname;
  }
  
  render() {
    return (
      <div>
        <h1>sandbox</h1>
        {this._renderRegistry()}
      </div>
    );
  }

  _renderRegistry() {
    const registry = this.props.registry;
    console.log(registry);

    return (
      <Router>
        <div>
          <ul>
            {this._recursivelyRenderRegistryKey(undefined, registry)}
          </ul>
        </div>
      </Router>
    );
  }

  _recursivelyRenderRegistryKey(topLevelKey, registry) {
    return Object.keys(registry).map(key => {
      if (!registry[key]) return null;
      
      this._stack.push(key);
    
      if (registry[key].isLeaf) {
        return (
          <li key={key}>
            <Link to={`${this._basePath}/${this._stack.join('/')}`}>{key}</Link>
            {this._renderComponentPage(registry[key].component)}
          </li>
        );
      }

      const result = (
        <li key={key}>
          {key}
          <ul>
            {this._recursivelyRenderRegistryKey(key, registry[key])}
          </ul>
        </li>
      );
      
      this._stack.pop();
      
      return result;
    });
  }
  
  _renderComponentPage(component) {
    console.log(this._stack);
    return (
      <Route exact path={`${this._basePath}/${this._stack.join('/')}`} render={() => component} />
    );
  }
}
