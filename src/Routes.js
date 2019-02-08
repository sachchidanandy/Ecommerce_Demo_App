import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import DashBoard from './components/dashBoard/DashBoard'

class AppRoute extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component = {Home}/>
                    <Route exact path='/dashboard' component={DashBoard}/>
                    <Route path='/about' component={About}/>
                    <Route path='/contact' component={Contact}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRoute;