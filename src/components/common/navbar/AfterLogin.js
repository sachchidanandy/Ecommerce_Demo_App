import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

const AfterLoginNav = ({toggle, isOpen, user }) => {
    return (
        <Navbar light expand='md' style = {{backgroundColor : '#232f3e'}}>
            <NavbarBrand href='/' style={{color :'#00CED1'}}><h2>Your Cart</h2></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="">
                            <i  className= "fa fa-user-circle fa-lg" aria-hidden="true" style={{color :'#00CED1'}}>
                                <span style={{color :'#00CED1'}}>Hello, {user.firstName}</span>
                            </i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="" >
                            <i  className= "fa fa-shopping-bag fa-lg" aria-hidden="true" style={{color :'#00CED1'}}>
                                <span style={{color :'#00CED1'}}>{user.inCart.length ? user.inCart.length : ''}</span>
                            </i>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar> 
    );
};

export default AfterLoginNav;