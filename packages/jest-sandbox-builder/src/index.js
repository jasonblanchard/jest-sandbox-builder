import get from 'lodash.get';
import set from 'lodash.set';

// TODO: Split up this file.

const registry = {};
const stack = [];
let lastIt;

export function describe(name, fn) {
  if (stack[stack.length - 1]) {
    registry[stack[stack.length - 1]][name] = {};
  } else {
    registry[name] = {};
  }
  stack.push(name);
  fn();
  stack.pop();
}

export function it(name, fn) {
  set(registry, [...stack, name], null);
  lastIt = name;
  fn();
}

export function beforeEach(fn) {
  set(registry, [...stack, 'beforeEach'], null);
  lastIt = 'beforeEach';
  fn();
}

export function factory(factoryFn, renderFn) {
  const component = factoryFn();
  set(registry, [...stack, lastIt], {
    isLeaf: true,
    component
  });

  if (process.env.NODE_ENV === 'test') return renderFn(component);

  // TODO: Abstract and generalize
  return {
    findWhere: () => ({
      exists: () => {},
      simulate: () => {}
    })
  };
}

export function getRegistry() {
  return registry;
}

// TODO: Mock all Jest globals https://facebook.github.io/jest/docs/en/api.html
export function expect() {
  return {
    toMatchSnapshot: () => {},
    toEqual: () => {},
    toBeCalled: () => {}
  };
}

export const jest = {
  fn: () => {}
}
