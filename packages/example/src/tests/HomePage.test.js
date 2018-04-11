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

  describe('block with beforeEach', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = render({ name: 'before each' });
    });

    it('does something', () => {
      expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello before each').exists()).toEqual(true);
    });
  });

  describe('prop name', () => {
    it('has a default prop name', () => {
      const wrapper = render();
      expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello world').exists()).toEqual(true);
    });

    it('takes a custom prop name', () => {
      const wrapper = render({ name: 'Test World' })
      expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello Test World').exists()).toEqual(true);
    });
  });

  it('calls onClick', () => {
    const onClick = jest.fn();
    const wrapper = render({ onClick });
    wrapper.findWhere(element => element.type() && element.text() === 'click me').simulate('click');
    expect(onClick).toBeCalled();
  });

  it('Does not include a render', () => {
    expect(1).toEqual(1);
  })
});

it('Outside HomePage test main describe', () => {
  expect(1).toEqual(1);
});
