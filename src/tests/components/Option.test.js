import React from 'react';
import { shallow } from 'enzyme';
import { Option } from '../../components/Option';
import options from '../fixtures/options';

let wrapper, startRemoveOption;
beforeEach(() => {
    startRemoveOption = jest.fn();
    wrapper = shallow(
        <Option
            startRemoveOption={startRemoveOption}
            option={options[0]}
            count={1}
        />
    );
});

test('Should render Option correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should call startRemoveOption on button click', () => {
    const value = { id: options[0].id };
    wrapper.find('button').simulate('click');
    expect(startRemoveOption).toHaveBeenCalledWith(value);
});