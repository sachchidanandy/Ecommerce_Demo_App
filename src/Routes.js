import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import DashBoard from './components/dashBoard/DashBoard'

class AppRoute extends Component {
    render () {
        const {user} = this.props;
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component = {Home}/>
                    <Route exact path='/dashboard' component={user.hasOwnProperty('email') ? DashBoard : Home}/>
                    <Route path='/about' component={About}/>
                    <Route path='/contact' component={Contact}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect (mapStateToProps)(AppRoute);