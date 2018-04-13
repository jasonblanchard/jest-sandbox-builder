# Jestbox
Build sandboxed examples of UI code alongside your Jest unit tests and view them in a browser.

## Why?
Automated unit tests are just as important for UI code as any other code, but you can't get the same level of confidence that everything is working as expected for a few reasons:

- UI code has a lot of implicit collaborators - browser APIs, styles etc. can change how your code looks and behaves when rendered in a browser and it can be different across browsers.
- UI code could _work_ correctly as defined in a unit test but _look_ weird. This is really difficult to capture in an automated unit test.
- UI code may _work_ correctly as defined in an automated unit test but it may _feel_ weird to a user. This is also difficult to capture in a unit test.

This means that at some point in the development cycle (and maybe the QA cycle), you will need to pull up your code in a browser and interact with it. This library makes it easier to do this along side your automated unit tests.

### Why not something else?
[Storybook](https://github.com/storybooks/storybook) and [React Cosmos](https://github.com/react-cosmos/react-cosmos) are some great libraries that achieve a similar thing. However, the goal of Jestbox is to colocate sandbox code with unit tests to encourage writing both and to share code between them. Storybook and React Comsos have some utilities to share sandbox code with unit tests, but they encourage a "sandbox-first" approach. This library is an attempt to flip that with a "unit test-first approach" - optimize for unit tests and drop in sandbox code when necessary.

## Getting Started

Install each library via npm:

```
npm install jestbox-builder jestbox-web jestbox-webpack-plugin
```

Add `jestbox-webpack-plugin` to your webpack configuration:

```js
const JestboxWebpackPlugin = require('jestbox-webpack-plugin');

module.exports = {
  ...
  plugins: {
    new JestboxWebpackPlugin()
  }
  ...
}
```

This will allow you to import Jest test files into your application like any other module by providing globals for `describe()` and `it()` calls.

## Usage

Import test files and pass the Jestbox registry to the Jestbox component. You may want to do this wherever you are defining your routes so you can mount your Jestbox somewhere in your app. You can import individual test files like any other module, or use webpack's `require.context` to include the entire test directory.

Here is an example using React Router:

```js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Jestbox } from 'jestbox-web';

const context = require.context('./tests', true, /\.test\.js$/);
context.keys().forEach(module => context(module));

import { getRegistry } from 'jestbox-builder';

const context = require.context('./tests', true, /\.test\.js$/);
context.keys().forEach(module => context(module));

import HomePage from './HomePage';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/jestbox" render={() => <Jestbox registry={getRegistry()} basePath="/jestbox" />} />
        </div>
      </Router>
    );
  }
}
```

This will mount the Jestbox to the `/jestbox` route in your application.

Now, in a test file, build up Jestbox examples alongside your test blocks. You can share code between them:


```js
import React from 'react';
import HomePage from '../HomePage';
import { mount } from 'enzyme';

import { jestbox, scenario } from 'jestbox-builder';

function factory(props) {
  return <HomePage {...props} />
}

function render(props) {
  return mount(factory(props));
}

jestbox('HomePage', () => {
  scenario('base case', () => {
    return factory();
  });

  scenario('takes custom prop name', () => {
    return factory({ name: 'custom prop' });
  });
});

describe('HomePage', () => {
  it('renders', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  describe('prop name', () => {
    it('takes a custom prop name', () => {
      const wrapper = render({ name: 'Test World' })
      expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello Test World').exists()).toEqual(true);
    });
  });
});
```

This will automatically create a Jestbox wherever you mounted the `<Jestbox>` component.

## Development
This is a monorepo managed with [lerna](https://github.com/lerna/lerna).

Build all packages:

```
lerna exec --ignore=example -- npm run build
```

Publish all packages

```
lerna publish --force-publish=jestbox-builder,jestbox-web,jestbox-webpack-plugin
```
