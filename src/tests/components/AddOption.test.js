import React from 'react';
import { shallow } from 'enzyme';
import { AddOption } from '../../components/AddOption';
import options from '../fixtures/options';

let wrapper, startAddOption;
beforeEach(() => {
    startAddOption = jest.fn();
    wrapper = shallow(<AddOption options={options} startAddOption={startAddOption} />);
});

test('Should render AddOption correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render error on empty form submission', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
            elements: {
                option: {
                    value: ''
                }
            }
        }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('Should render error on existing option on form submit', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
            elements: {
                option: {
                    value: options[0].description
                }
            }
        }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('Should call startAddOption on successful form submission', () => {
    const description = 'Test option';
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
            elements: {
                option: {
                    value: description
                }
            }
        }
    });
    expect(wrapper.state('error')).toBeFalsy();
    expect(startAddOption).toHaveBeenCalledWith({ description });
});