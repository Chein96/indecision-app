import authReducer from '../../reducers/auth';

test('Should set default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('Should set uid on login', () => {
    const uid = 'thisissomeuid';
    const state = authReducer({}, {
        type: 'LOGIN',
        uid
    });
    expect(state).toEqual({
        uid
    });
});

test('Should remove uid on logout', () => {
    const state = authReducer({ uid: 'thisissomeuid' }, {
        type: 'LOGOUT'
    });
    expect(state).toEqual({});
});