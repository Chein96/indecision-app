import React from 'react';
import { shallow } from 'enzyme';
import Modal from 'react-modal';
import { OptionModal } from '../../components/OptionModal';
import options from '../fixtures/options';

let wrapper, selectedOption, handleClearSelectedOption;
beforeEach(() => {
    selectedOption = options[0].description;
    handleClearSelectedOption = jest.fn();
    wrapper = shallow(<OptionModal selectedOption={selectedOption} handleClearSelectedOption={handleClearSelectedOption} />);
});

test('Should render OptionModal correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle handleClearSelectedOption on button click', () => {
    wrapper.find('button').simulate('click');
    expect(handleClearSelectedOption).toHaveBeenCalled();
});

test('Should handle handleClearSelectedOption on user request', () => {
    wrapper.find(Modal).prop('onRequestClose')();
    expect(handleClearSelectedOption).toHaveBeenCalled();
});