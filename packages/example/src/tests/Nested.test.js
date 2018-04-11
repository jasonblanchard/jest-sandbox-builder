import { mount } from 'enzyme';
import React from 'react';

import Nested from '../Nested';

import { renderFactory } from 'jestbox-builder';

function render(props, testFn) {
  renderFactory(
    () => <Nested {...props} />,
    component => mount(component),
    wrapper => testFn(wrapper)
  )
}

describe('Nested', () => {
  it('renders', () => {
    render({}, wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
