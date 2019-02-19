import React, {Component} from 'react';
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './App.css';
import {fetchUser} from './actions/userAction';
import {Redirect} from 'react-router-dom';

const store = configureStore();

if (localStorage.hasOwnProperty('user')) {
    const email = JSON.parse(localStorage.getItem('user'));
    store.dispatch(fetchUser(email)).catch(() => <Redirect to = '/'/>);
}

export default class App extends Component {
    render () {
        return (
            <Provider store = {store}>
                <AppRoutes/>
            </Provider>
        );
    }
}