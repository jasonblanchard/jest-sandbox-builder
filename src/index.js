export * from './describe';

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