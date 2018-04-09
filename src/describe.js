import get from 'lodash.get';
import set from 'lodash.set';

const registry = {};
const stack = [];

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
  set(registry, [...stack, name], name);
  fn();
}

console.log('registry', registry);
