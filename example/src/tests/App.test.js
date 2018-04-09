import React from 'react';
import App from '../App';
import { mount } from 'enzyme';

import { factory } from 'sandbox-builder';

function render(props) {
  // const component = <App {...props} />;
  // const wrapper = mount(component);
  // return wrapper;

  return factory(() => {
    return <App {...props} />;
  }, mount);
}

describe('App', () => {
  it('renders', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  describe('prop name', () => {
    it('has a default prop name', () => {
      const wrapper = render();
      expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello world').exists()).toEqual(true);
    });

    it('takes a custom prop name', () => {
      const wrapper = render({ name: 'Test World' });
      expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello Test World').exists()).toEqual(true);
    });
  });

  it('calls onClick', () => {
    const onClick = jest.fn();
    const wrapper = render({ onClick });
    wrapper.findWhere(element => element.type() && element.text() === 'click me').simulate('click');

    expect(onClick).toBeCalled();
  });
});

it('Outside main describe', () => {
  const wrapper = render();
  expect(1).toEqual(1);
});

it('No render', () => {})
