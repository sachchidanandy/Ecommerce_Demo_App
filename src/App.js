import React, {Component} from 'react';
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as productActions from './actions/productsAction';
import './App.css';

const store = configureStore();
store.dispatch(productActions.fetchProducts());

export default class App extends Component {
    render () {
        return (
            <Provider store = {store}>
                <AppRoutes/>
            </Provider>
        );
    }
}