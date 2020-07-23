import optionsReducer from '../../reducers/options';
import options from '../fixtures/options';

test('Should set default state', () => {
    const state = optionsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Should add option', () => {
    const newOption = {
        id: 'someid',
        description: 'sample description'
    }
    const action = {
        type: 'ADD_OPTION',
        option: newOption
    };
    const state = optionsReducer(options, action);
    expect(state).toEqual([
        ...options,
        newOption
    ]);
});

test('Should remove option', () => {
    const action = {
        type: 'REMOVE_OPTION',
        id: options[1].id
    };
    const state = optionsReducer(options, action);
    expect(state).toEqual([
        options[0],
        options[2]
    ]);
});

test('Should not remove option on wrong id', () => {
    const action = {
        type: 'REMOVE_OPTION',
        id: 'somewrongid'
    };
    const state = optionsReducer(options, action);
    expect(state).toEqual(options);
});

test('Should remove all options', () => {
    const action = {
        type: 'REMOVE_ALL_OPTIONS'
    };
    const state = optionsReducer(options, action);
    expect(state).toEqual([]);
});

test('Should set new options', () => {
    const action = {
        type: 'SET_OPTIONS',
        options
    };
    const state = optionsReducer([], action);
    expect(state).toEqual(options);
});