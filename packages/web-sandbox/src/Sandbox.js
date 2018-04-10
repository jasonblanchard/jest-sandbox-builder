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
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, padding: '5px' }}>
            <ul>
              {this._recursivelyRenderRegistryKeyLink(undefined, registry)}
            </ul>
          </div>
          <div style={{
            flex: 5
          }}>
            {this._recursivelyRenderRegistryComponent(registry)}
          </div>
        </div>
      </Router>
    );
  }

  _recursivelyRenderRegistryKeyLink(topLevelKey, registry) {
    return Object.keys(registry).map(key => {
      let result;
      
      if (!registry[key]) return null;
      
      this._stack.push(key);
    
      if (registry[key].isLeaf) {
        result = (
          <li key={key}>
            <Link to={`${this._basePath}/${this._stack.join('/')}`}>{key}</Link>
          </li>
        );
        
        this._stack.pop();
        return result;
      }
      
      const isTopLevelKey = this._stack.length < 2;
      
      result = (
        <li key={key}>
          {isTopLevelKey ? <h2>{key}</h2> : key}
          <ul>
            {this._recursivelyRenderRegistryKeyLink(key, registry[key])}
          </ul>
        </li>
      );
      
      this._stack.pop();
      
      return result;
    });
  }
  
  _recursivelyRenderRegistryComponent(registry) {
    return Object.keys(registry).map(key => {
      let result;
      
      if (!registry[key]) return null;
      
      this._stack.push(key);
    
      if (registry[key].isLeaf) {
        result = (
          <div key={key}>
            {this._renderComponentPage(registry[key].component, [...this._stack].join(' > '))}
          </div>
        );
        
        this._stack.pop();
        return result;
      }
      
      result = this._recursivelyRenderRegistryComponent(registry[key])

      this._stack.pop();
      
      return result;
    });
  }
  
  _renderComponentPage(component, title) {
    const page = (
      <div>
        <h3>{title}</h3>
        <div style={{
          height: '100vh',
          border: '1px dashed gray',
          backgroundImage: 'linear-gradient(45deg, #f1f1f1 25%, transparent 25%), linear-gradient(135deg, #f1f1f1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f1f1 75%), linear-gradient(135deg, transparent 75%, #f1f1f1 75%)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 0, 12px -12px, 0px 12px'
        }}>
          {component}
        </div>
      </div>
    )
    
    return (
      <Route exact path={`${this._basePath}/${this._stack.join('/')}`} render={() => page} />
    );
  }
}
