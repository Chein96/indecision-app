import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../components/Login';

let wrapper, startGoogleLogin;
beforeEach(() => {
    startGoogleLogin = jest.fn();
    wrapper = shallow(<Login startGoogleLogin={startGoogleLogin} />);
});

test('Should render Login correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});

test('Should call startGoogleLogin on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startGoogleLogin).toHaveBeenCalled();
});