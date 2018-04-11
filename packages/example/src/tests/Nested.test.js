import { mount } from 'enzyme';
import React from 'react';

import Nested from '../Nested';

import { jestbox, scenario } from 'jestbox-builder';

function factory(props) {
  return <Nested {...props} />
}

function render(props) {
  return mount(factory(props));
}

jestbox('Nested', () => {
  scenario('Base case', () => {
    return factory();
  });

  scenario('custom onClick', () => {
    const onClick = () => { console.log('Custom Clicked') };
    return factory({ onClick });
  })
});

describe('Nested', () => {
  it('renders', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
});
