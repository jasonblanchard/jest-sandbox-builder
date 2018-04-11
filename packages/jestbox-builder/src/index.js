import set from 'lodash.set';

const registry = {};
const stack = [];

export function jestbox(name, fn) {
  if (stack[stack.length - 1]) {
    registry[stack[stack.length - 1]][name] = {};
  } else {
    registry[name] = {};
  }
  stack.push(name);
  fn();
  stack.pop();
}

export function scenario(name, fn) {
  set(registry, [...stack, name], {
    isLeaf: true,
    component: fn()
  });
}

export function describe() {}
export function it() {}

export function getRegistry() {
  return registry;
}
