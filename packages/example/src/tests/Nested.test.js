import { mount } from 'enzyme';
import React from 'react';

import Nested from '../Nested';
import { factory } from 'jest-sandbox-builder';

function render(props) {
  return factory(() => {
    return <Nested {...props} />;
  }, mount);
}

describe('Nested', () => {
  it('renders', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
});
