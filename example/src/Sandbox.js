import React, { Component } from 'react';

import { getRegistry } from 'sandbox-builder';

// TODO: Import all test files
import './tests/App.test.js';

export default class Sandbox extends Component {
  render() {
    return (
      <div>
        <h1>sandbox</h1>
        {this._renderRegistry()}
      </div>
    );
  }

  _renderRegistry() {
    const registry = getRegistry();
    console.log(registry);

    return (
      <ul>
        {this._recursivelyRenderRegistryKey(undefined, registry)}
      </ul>
    );
  }

  _recursivelyRenderRegistryKey(topLevelKey, registry) {
    return Object.keys(registry).map(key => {
      if (!registry[key]) return null;

      if (registry[key].isLeaf) {
        return (
          <li key={key}>
            <h2>{key}</h2>
            {registry[key].component}
          </li>
        );
      }

      return (
        <li key={key}>
          <h2>{key}</h2>
          <ul>
            {this._recursivelyRenderRegistryKey(key, registry[key])}
          </ul>
        </li>
      );
    });
  }
}
