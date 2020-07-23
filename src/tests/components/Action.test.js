import React from 'react';
import { shallow } from 'enzyme';
import { Action } from '../../components/Action';

let wrapper, handlePick;
beforeEach(() => {
    handlePick = jest.fn();
    wrapper = shallow(<Action handlePick={handlePick} hasOptions={false} />);
})

test('Should render Action correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle onClick', () => {
    wrapper = shallow(<Action handlePick={handlePick} hasOptions={true} />);
    wrapper.find('button').simulate('click');
    expect(handlePick).toHaveBeenCalled();
});