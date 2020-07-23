import React from 'react';
import { shallow } from 'enzyme';
import { IndecisionApp } from '../../components/IndecisionApp';
import options from '../fixtures/options';

let wrapper, uid;
beforeEach(() => {
    uid = 'thisissomeuid';
    wrapper = shallow(<IndecisionApp uid={uid} options={options} />);
});

test('Should render IndecisionApp-login correctly when no user', () => {
    wrapper = shallow(<IndecisionApp />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render IndecisionApp correclty when user logged in', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle handlePick', () => {
    wrapper.find('Connect(Action)').prop('handlePick')();
    expect(wrapper.state('selectedOption').length).toBeGreaterThan(0);
});

test('Should handle handleClearSelectedOption', () => {
    wrapper.find('Connect(Action)').prop('handlePick')();
    wrapper.find('OptionModal').prop('handleClearSelectedOption')();
    expect(wrapper.state('selectedOption')).toBeFalsy();
});