import React, {Component} from 'react'; 
import Headers from '../common/Header';
import ProductSummary from '../common/ProductSummary';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

class Cart extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            isOpen : false,
            quantity : 1,
            ApiCallInProgress : false,
        }
    }

    //Handle the toogle during mobile view
    onToggle() {
        this.setState((prevState) => ({
          isOpen: !prevState.isOpen
        }));
    }

    render() {
        if (!this.props.user.hasOwnProperty('email')) {
            return <Redirect to = '/'/>
        }

        const {cartItems, user} = this.props
        return (
            <div className = 'container-fluid'>
                <div className = 'container-fluid sticky'>
                    <Headers
                        validUser = {user}
                        toggle ={this.onToggle}
                        isOpen = {this.state.isOpen}
                    />
                </div>
                <div className = 'container-fluid relative'>
                    <h3 style = {{color : '#a73a00'}}>Shopping Cart</h3>
                    {   cartItems.length <= 0 ? <Link to = '/dashboard'><h4>Shop Now!!</h4></Link> 
                        : cartItems.map(
                            item => <ProductSummary key = {item.product.sku} {...item.product} quantity = {item.quantity}/>
                        )
                    }
                </div>
            </div>
        );
    }
}
 
function AddStateToProps (state) {
    return {
        user : state.user,
        cartItems : state.user.inCart
    };
}

function AddActionsToProps (dispatch) {
    return {

    };
}

export default connect(AddStateToProps, AddActionsToProps)(Cart);