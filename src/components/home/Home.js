import React, {Component} from 'react';
import Header from '../common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/userAction';
import LoginForm from './LoginForm';
import RegistrationForm from './Registration';
import { Input } from 'reactstrap';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state ={
            user : {
                email : '',
                password : '',
                firstName : '',
                middleName : '',
                lastName : ''
            },
            apiCallInProcess : false,
            showLogin :true
        };
        this.onChangeForm = this.onChangeForm.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.toogle = this.toogle.bind(this);
    }

    onChangeForm(event) {
        const user = Object.assign({}, this.state.user);
        user[event.target.name] = event.target.value;
        this.setState({user : user});
    }

    onLogin(event) {
        event.preventDefault();
        this.setState({apiCallInProcess : true});
        this.props.actions.loginUser(this.state.user);
    }

    onRegister(event) {
        event.preventDefault();
        this.setState({apiCallInProcess : true});
        this.props.actions.registerUser(this.state.user);
    }

    toogle() {
        this.setState({showLogin : !this.state.showLogin});
    }

    render() {
        const {user, apiCallInProcess, showLogin } = this.state;
        return (
            <div className = 'container-fluid'>
                <Header/>
                <div className = 'row'>
                    <div className = 'col-lg-7 System align-self-start'>
                        <img src = 'assets/images/homePic.jpg' alt = 'Shoping' style = {{}}/>
                    </div>
                    <div className = 'col-lg-4 Tablet align-self-center FormDiv'>
                        <div style ={{padding : 10}}>
                            <h3 style ={{padding : 10}}>Don't Have Account..?</h3>
                            <h4 style ={{padding : 10}}>Create It Not !!</h4>
                            <RegistrationForm
                                user = {user} 
                                onChange = {this.onChangeForm} 
                                onRegister = {this.onRegister} 
                                apiCallInProcess = {apiCallInProcess}
                            />
                        </div>
                    </div>
                    <div className = 'col-sm-9 Mobile align-self-center'>
                        {
                            showLogin ? <LoginForm 
                            user = {user} 
                            onChange = {this.onChangeForm} 
                            onLogin = {this.onLogin} 
                            apiCallInProcess = {apiCallInProcess}
                            /> :  <RegistrationForm
                            user = {user} 
                            onChange = {this.onChangeForm} 
                            onRegister = {this.onRegister} 
                            apiCallInProcess = {apiCallInProcess}
                            />
                        }
                        <br/>
                        <Input
                            type = 'submit'
                            value = {showLogin ? 'Create Account' : 'Sign In'}
                            className = 'btn btn-success'
                            onClick = {this.toogle}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
      props :state.user
    };
}
function mapActionsToProps (dispatch) {
    return {
        actions : bindActionCreators(userAction, dispatch)
    };
}
export default connect(mapStateToProps,mapActionsToProps)(Home);