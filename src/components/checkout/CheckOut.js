import React , {Component} from 'react';
import Headers from '../common/Header';
import * as userAction from '../../actions/userAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrderDetail from './OrderDetails';
import {GST_PER} from '../../constants/AppConstants';
import { Redirect} from 'react-router-dom';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isOpen : false
        };

        this.getSubTotal = this.getSubTotal.bind(this);
        this.getTax = this.getTax.bind(this);
    }

    //Handle the toogle during mobile view
    onToggle() {
        this.setState((prevState) => ({
          isOpen: !prevState.isOpen
        }));
    }

    //Calculate sub total of all products in cart
    getSubTotal(lastOrder) {
        const priceArray = lastOrder.map(item => Number(item.product.price * item.quantity));
        return (priceArray.reduce((total, price) => total + price, 0)).toFixed(2);
    }

    //Calculate Tax
    getTax(subTotal) {
        return ((GST_PER * subTotal)/100).toFixed(2) ;
    }

    render() { 
        if (!this.props.user.hasOwnProperty('email')) {
            return <Redirect to = '/'/>;
        }
        const {user} = this.props;
        const subTotal = this.getSubTotal(user.lastOrder);
        const tax = this.getTax(subTotal);
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
                    <h4 style = {{color : '#a73a00'}}> Thank you. Your Order has been received.</h4>
                    <OrderDetail lastOrder = {user.lastOrder} subTotal= {subTotal} tax ={tax} GST_PER = {GST_PER}/>
                    <button className = 'btn btn-primary'>Print</button>
                </div>
            </div>
        );
    }
}
 
function addPropsToState (state) {
    return {
        user : state.user
    };
}

function addActionsToState (dispatch) {
    return {
        userAction : bindActionCreators(userAction, dispatch)
    };
}

export default connect(addPropsToState, addActionsToState)(Checkout);