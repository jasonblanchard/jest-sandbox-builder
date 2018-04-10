import React, { Component } from 'react';

import { getRegistry } from 'sandbox-builder';

const context = require.context('./tests', true, /\.test\.js$/);
context.keys().forEach(module => context(module));

// TODO: Move to separate package.
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

    // TODO: Render with paths instead of `<ul>`s
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
