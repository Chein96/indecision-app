import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import IndecisionApp from './components/IndecisionApp';
import LoadingPage from './components/LoadingPage';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { startSetOptions } from './actions/options';
import { firebase } from './firebase/firebase';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

Modal.setAppElement('#app');

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <IndecisionApp />
    </Provider>
);
let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(login(user.uid));
        store.dispatch(startSetOptions()).then(() => {
            renderApp();
        });
    }
    else
    {
        store.dispatch(logout());
        renderApp();
    }
});