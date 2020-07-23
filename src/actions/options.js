import database from '../firebase/firebase';

export const addOption = (option) => ({
    type: 'ADD_OPTION',
    option
});

export const startAddOption = (optionData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const { description = '' } = optionData;
        const option = { description };
        
        return database.ref(`users/${uid}/options`).push(option).then((ref) => {
            dispatch(addOption({
                id: ref.key,
                ...option
            }));
        });
    }
};

export const removeOption = ({ id }) => ({
    type: 'REMOVE_OPTION',
    id
});

export const startRemoveOption = ({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/options/${id}`).remove().then(() => {
            dispatch(removeOption({ id }));
        });
    }
};

export const removeAllOptions = () => ({
    type: 'REMOVE_ALL_OPTIONS'
});

export const startRemoveAllOptions = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/options`).set([]).then(() => {
            dispatch(removeAllOptions());
        });
    }
};

export const setOptions = (options) => ({
    type: 'SET_OPTIONS',
    options
});

export const startSetOptions = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/options`).once('value').then((snapshot) => {
            const optionsData = [];
            snapshot.forEach((childSnapshot) => {
                optionsData.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setOptions(optionsData));
        });
    }
}