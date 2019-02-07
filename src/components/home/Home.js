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
                password : ''
            },
            registerUser : {
                email : '',
                password : '',
                firstName : '',
                middleName : '',
                lastName : ''
            },
            loginApiProgress : false,
            registerApiProgress : false,
            showLogin :true
        };
        this.onLoginChangeForm = this.onLoginChangeForm.bind(this);
        this.onRegisterChangeForm = this.onRegisterChangeForm.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.toogle = this.toogle.bind(this);
    }

    onLoginChangeForm(event) {
        const user = Object.assign({}, this.state.user);
        user[event.target.name] = event.target.value;
        this.setState({user : user});
    }

    onRegisterChangeForm(event) {
        const registerUser = Object.assign({}, this.state.registerUser);
        registerUser[event.target.name] = event.target.value;
        this.setState({registerUser : registerUser});
    }

    onLogin(event) {
        event.preventDefault();
        this.setState({loginApiProgress : true});
        this.props.actions.loginUser(this.state.user)
        .then (() => this.props.history.push('/'))
        .catch(error => {throw(error)});
    }

    onRegister(event) {
        event.preventDefault();
        this.setState({registerApiProgress : true});
        this.props.actions.registerUser(this.state.registerUser)
        .then (() => this.props.history.push('/'))
        .catch(error => {throw(error)});
    }

    toogle() {
        this.setState({showLogin : !this.state.showLogin});
    }

    render() {
        const {user, loginApiProgress, showLogin, registerUser, registerApiProgress } = this.state;
        return (
            <div className = 'container-fluid'>
                <div className = 'container-fluid sticky'>
                    <Header
                        validUser = {this.props.user}
                        user = {user}
                        onFormChange = {this.onLoginChangeForm}
                        apiCallInProcess = {loginApiProgress}
                        login = {this.onLogin}
                    />
                </div>
                <div className = 'container-fluid row relative'>
                    <div className = 'col-lg-7 System align-self-center'>
                        <img src = 'assets/images/homePic.jpg' alt = 'Shoping'/>
                    </div>
                    <div className = 'col-lg-4 Tablet align-self-center FormDiv'>
                        <div style ={{padding : 10}}>
                            <h3 style ={{padding : 10}}>Don't Have Account..?</h3>
                            <h4 style ={{padding : 10}}>Create It Not !!</h4>
                            <RegistrationForm
                                user = {registerUser} 
                                onChange = {this.onRegisterChangeForm} 
                                onRegister = {this.onRegister} 
                                apiCallInProcess = {registerApiProgress}
                            />
                        </div>
                    </div>
                    <div className = 'col-sm-11 Mobile align-self-center'>
                        {
                            showLogin ? <LoginForm 
                            user = {user} 
                            onChange = {this.onLoginChangeForm} 
                            onLogin = {this.onLogin} 
                            apiCallInProcess = {loginApiProgress}
                            /> :  <RegistrationForm
                            user = {registerUser} 
                            onChange = {this.onRegisterChangeForm} 
                            onRegister = {this.onRegister} 
                            apiCallInProcess = {registerApiProgress}
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

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapActionsToProps (dispatch) {
    return {
        actions : bindActionCreators(userAction, dispatch)
    };
}

export default connect(mapStateToProps,mapActionsToProps)(Home);