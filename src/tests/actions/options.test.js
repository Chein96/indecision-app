import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import {
    addOption,
    startAddOption,
    removeOption,
    startRemoveOption,
    removeAllOptions,
    startRemoveAllOptions,
    setOptions,
    startSetOptions
} from '../../actions/options';
import options from '../fixtures/options';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const optionsData = {};
    options.forEach(({ id, description }) => {
        optionsData[id] = { description }
    });
    database.ref(`users/${uid}/options`).set(optionsData).then(() => done());
});

test('Should setup addOption action object', () => {
    const option = options[0];
    const action = addOption(option);
    expect(action).toEqual({
        type: 'ADD_OPTION',
        option
    });
});

test('Should add option to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const optionData = {
        description: 'A new option'
    };
    store.dispatch(startAddOption(optionData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_OPTION',
            option : {
                id: expect.any(String),
                ...optionData
            }
        });

        return database.ref(`users/${uid}/options/${actions[0].option.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(optionData);
        done();
    });
});

test('Should add option to database and store with default values', (done) => {
    const store = createMockStore(defaultAuthState);
    const defaultData = {
        description: ''
    };
    store.dispatch(startAddOption()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_OPTION',
            option: {
                id: expect.any(String),
                ...defaultData
            }
        });

        return database.ref(`users/${uid}/options/${actions[0].option.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);
        done();
    });
});

test('Should setup removeOption action object', () => {
    const id = options[1].id;
    const action = removeOption({ id });
    expect(action).toEqual({
        type: 'REMOVE_OPTION',
        id
    });
});

test('Should remove option from database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = options[1].id;
    store.dispatch(startRemoveOption({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_OPTION',
            id
        });

        return database.ref(`users/${uid}/options/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('Should setup removeAllOptions action object', () => {
    const action = removeAllOptions();
    expect(action).toEqual({
        type: 'REMOVE_ALL_OPTIONS'
    });
});

test('Should remove all options from database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startRemoveAllOptions()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_ALL_OPTIONS'
        });

        return database.ref(`users/${uid}/options`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('Should setup setOptions action object', () => {
    const action = setOptions(options);
    expect(action).toEqual({
        type: 'SET_OPTIONS',
        options
    });
});

test('Should fetch options from database to the store', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetOptions()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_OPTIONS',
            options
        });
        done();
    })
});