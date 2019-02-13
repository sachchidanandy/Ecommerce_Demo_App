import React, {Component} from 'react'; 
import Headers from '../common/Header';
import ProductSummary from '../common/ProductSummary';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/userAction';
import toastr from 'toastr';

class Cart extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            isOpen : false,
            ApiCallInProgress : false,
            cartItems : this.props.user.inCart
        };

        this.onQuantityChange = this.onQuantityChange.bind(this);
        this.getSubTotal = this.getSubTotal.bind(this);
        this.deleteItems = this.deleteItems.bind(this);
    }

    //Handle the toogle during mobile view
    onToggle() {
        this.setState((prevState) => ({
          isOpen: !prevState.isOpen
        }));
    }

    //Handle change in the quantity of product in cart
    onQuantityChange(event) {
        if (event.target.value > 0) {
            const cartItems = [...this.state.cartItems];
            const cartIndex = cartItems.findIndex((item) => item.product.sku === event.target.name);
            cartItems[cartIndex].quantity = event.target.value;
            this.setState({cartItems : cartItems});
        }
    }

    //Delete productts from cart
    deleteItems(event) {
        this.props.userAction.deleteFromCart(this.props.user.id, event.target.name)
        .then (() => toastr.success('Product deleted from Cart'))
        .catch((error) => toastr.error(error));
    }

    //Calculate sub total of all products in cart
    getSubTotal() {
        const priceArray = this.state.cartItems.map(item => item.product.price * item.quantity);
        return (priceArray.reduce((total, price) => total + price, 0)).toFixed(2);
    }

    render() {
        if (!this.props.user.hasOwnProperty('email')) {
            return <Redirect to = '/'/>;
        }

        const {user} = this.props;
        const {cartItems} = this.state;
        const subTotal = this.getSubTotal();
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
                            item => <ProductSummary key = {item.product.sku} onQuantityChange = {this.onQuantityChange} {...item.product} deleteItems = {this.deleteItems}quantity = {item.quantity}/>
                        )
                    }
                    <div style = {{float : 'right', backgroundColor : '#f3f3f3', padding : '20px', borderRadius : '15px'}}>
                        <h4 style = {{color : '#a73a00'}}> Subtotal ({cartItems.length} item) : Rs. {subTotal}</h4>
                        <button style = {{backgroundColor : '#f0c859'}} disabled = {cartItems.length <= 0}>Proceed to Buy</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
function AddStateToProps (state) {
    return {
        user : state.user
    };
}

function AddActionsToProps (dispatch) {
    return {
        userAction : bindActionCreators(userAction, dispatch)
    };
}

export default connect(AddStateToProps, AddActionsToProps)(Cart);