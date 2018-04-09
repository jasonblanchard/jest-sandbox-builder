import React from 'react';
import App from '../App';
import { mount } from 'enzyme';

export function factory() {
  return <App />
}

function render(props) {
  const component = <App {...props} />;
  const wrapper = mount(component);
  return wrapper;
}

describe('App', () => {
  it('renders', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  describe('name', () => {
    it('has a default name', () => {
      const wrapper = render();
      expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello world').exists()).toEqual(true);
    });

    it('takes a custom name', () => {
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
