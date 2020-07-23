import React from 'react';
import { shallow } from 'enzyme';
import { Options } from '../../components/Options';
import options from '../fixtures/options';

let wrapper, startRemoveAllOptions;
beforeEach(() => {
    startRemoveAllOptions = jest.fn();
    wrapper = shallow(<Options options={options} startRemoveAllOptions={startRemoveAllOptions} />);
});

test('Should render Options correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render Options with no options correctly', () => {
    wrapper = shallow(<Options options={[]} startRemoveAllOptions={startRemoveAllOptions} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should call startRemoveAllOptions on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startRemoveAllOptions).toHaveBeenCalled();
});