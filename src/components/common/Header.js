import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button, Collapse } from 'reactstrap';
import InputField from './InputField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/userAction';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user : {email : '', password : ''},
            isOpen: false
        };

        this.onFormChange = this.onFormChange.bind(this);
        this.login = this.login.bind(this);
    }

    onFormChange (event) {
        const user = Object.assign({},this.state.user);
        user[event.target.name] = event.target.value;
        this.setState({user : user});
    }

    login() {
        this.props.actions.loginUser(this.state.user);
    }

  render() {
        const {user} = this.state;
        return (
            <Navbar color="light" light expand="md" style = {{backgroundColor : '#D5D8DC'}}>
                <NavbarBrand href="/"><h2>Your Cart</h2></NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                    {this.props.user.email ? '' : <Nav className="ml-auto" navbar>
                        <NavItem style ={{margin : 5}}>
                            <InputField
                                name = 'email'
                                label = 'Email'
                                InputType = 'email'
                                placeholder = 'Enter Email'
                                value = {user.email}
                                onChange = {this.onFormChange}
                            />
                        </NavItem>
                        <NavItem style ={{margin : 5}}>
                            <InputField
                                name = 'password'
                                label = 'Password'
                                InputType = 'password'
                                placeholder = 'Enter Password'
                                value = {user.password}
                                onChange = {this.onFormChange}
                            />
                        </NavItem>
                        <NavItem style ={{margin : 12}}>
                            <br/>
                            <Button className = 'btn btn-primary' onClick = {this.login}>Login</Button>
                        </NavItem>
                    </Nav>}
                </Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapActionsToProps(dispatch) {
    return {
        actions : bindActionCreators(userAction, dispatch)
    };
}

export default connect(mapStateToProps,mapActionsToProps)(Header);