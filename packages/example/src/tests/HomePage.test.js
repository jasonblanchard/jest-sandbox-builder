import React from 'react';
import HomePage from '../HomePage';
import { mount } from 'enzyme';

import { renderFactory } from 'jestbox-builder';

function render(props, testFn) {
  renderFactory(
    () => <HomePage {...props} />,
    component => mount(component),
    wrapper => testFn(wrapper)
  )
}

describe('HomePage', () => {
  it('renders', () => {
    render({}, wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  
  describe('block with beforeEach', () => {
    let props;
    
    beforeEach(() => {
      props = { name: 'before each' };
    });
    
    it('does something', () => {
      render(props, wrapper => {
        expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello before each').exists()).toEqual(true);
      });
    });
    
    it('does something again', () => {
      render(props, wrapper => {
        expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello before each').exists()).toEqual(true);
      });
    });
  })

  describe('prop name', () => {
    it('has a default prop name', () => {
      render({}, wrapper => {
        expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello world').exists()).toEqual(true);
      });
    });

    it('takes a custom prop name', () => {
      render({ name: 'Test World' }, wrapper => {
        expect(wrapper.findWhere(element => element.type() && element.text() === 'Hello Test World').exists()).toEqual(true);
      });
    });
  });

  it('calls onClick', () => {
    const onClick = jest.fn();
    render({ onClick }, wrapper => {
      wrapper.findWhere(element => element.type() && element.text() === 'click me').simulate('click');
      expect(onClick).toBeCalled();
    });
  });

  it('Does not include a render', () => {
    expect(1).toEqual(1);
  })
});

it('Outside HomePage test main describe', () => {
  render({}, () => {
    expect(1).toEqual(1);
  });
});
