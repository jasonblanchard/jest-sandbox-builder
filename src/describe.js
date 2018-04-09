import get from 'lodash.get';
import set from 'lodash.set';

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

// TODO: Deal with beforeEach

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
