export * from './describe';

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
