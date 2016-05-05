jest.unmock('../App');

import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Header from '../components/Header/Header';
import Page from '../components/Page/Page';

import expect from 'expect';

describe(<App />, () => {

  it('renders Head and Page components inside', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toBe(1);
    expect(wrapper.find(Page).length).toBe(1);
  });
});
