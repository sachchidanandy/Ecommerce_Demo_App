import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Headers  from '../common/Header';
import ProductDescription from './ProductDescription';
import ProductList from '../common/ProductList';

class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen : false,
            slicedProduct : [
                {"sku":"102838","name":"Dasani 600ml (non-AS)","price":"10.10","rrpCasePrice":"10.10","imageURLLarge":"http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg","thumbnailURL":"http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg","description":"Dasani 600ml (non-AS)","pack":" 24s","brand":"Dasani","displayPriority":1,"brandLogo":"http://sglocalmerapi.rdnsing.com/uploads/ko/images/brands/Dasani_20181024_070034.jpg","flavour":"Drinking Water","packType":"DRINKING WATER","packSize":"600ML","packSizeValue":600,"rcpCasePrice":"0","countFlag":false,"isTaxable":true,"isCupRule":false,"offerIDs":""},

                {"sku":"106254","name":"Dasani 1.5L (AS & WS)","price":"10.10","rrpCasePrice":"10.10","imageURLLarge":"http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg","thumbnailURL":"http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg","description":"Dasani 1.5L (AS & WS)","pack":" 12s","brand":"Dasani","displayPriority":1,"brandLogo":"http://sglocalmerapi.rdnsing.com/uploads/ko/images/brands/Dasani_20181024_070034.jpg","flavour":"Drinking Water","packType":"DRINKING WATER","packSize":"1.5L","packSizeValue":1500,"rcpCasePrice":"0","countFlag":false,"isTaxable":true,"isCupRule":false,"offerIDs":""},
                
                {"sku":"106752","name":"Schwep Tonic slab 12's Clear 320ml","price":"10.10","rrpCasePrice":"10.10","imageURLLarge":"http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg","thumbnailURL":"http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg","description":"Schwep Tonic slab 12's Clear 320ml","pack":" 12s","brand":"Schweppes","displayPriority":null,"brandLogo":"http://sgdev.rdnsing.com/uploads/ko/Schweppes.jpeg","flavour":"Tonic Water","packType":"CAN SLAB (SLEEK CAN)","packSize":"320ML","packSizeValue":320,"rcpCasePrice":"0","countFlag":false,"isTaxable":true,"isCupRule":false,"offerIDs":""},
                
                {"sku":"106755","name":"Schwep Ginger Ale slab 12's Clear 320ml","price":"10.10","rrpCasePrice":"10.10","imageURLLarge":"http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg","thumbnailURL":"http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg","description":"Schwep Ginger Ale slab 12's Clear 320ml","pack":" 12s","brand":"Schweppes","displayPriority":null,"brandLogo":"http://sgdev.rdnsing.com/uploads/ko/Schweppes.jpeg","flavour":"Ginger Ale","packType":"CAN SLAB (SLEEK CAN)","packSize":"320ML","packSizeValue":320,"rcpCasePrice":"0","countFlag":false,"isTaxable":true,"isCupRule":true,"offerIDs":""},
            ]
        }
    }
    render() { 
        if (! this.props.user.hasOwnProperty('email')) {
            return <Redirect to='/' />;
        }
        const {user, product} = this.props;
        const {isOpen, slicedProduct} = this.state;
        return (
            <div className = 'container-fluid'>
                <div className = 'container-fluid sticky'>
                    <Headers
                        validUser = {user}
                        toggle ={this.onToggle}
                        isOpen = {isOpen}
                    />
                </div>
                <div className = 'container-fluid row relative'>
                    <div className = 'col-sm-11 col-md-5'>
                        <img src = {product.imageURLLarge} style = {{maxWidth : '100%'}}/>
                    </div>
                    <div className = 'col-sm-11 col-md-6'  style = {{borderRadius : '15px', border : '2px solid black', padding : '20px', backgroundColor : '#fcfcf7'}}>
                        <ProductDescription {...product}/>
                    </div>
                    <div className = 'col-sm-11' style = {{padding : '20px', margin : '20px'}}>
                        <span style = {{color : '#535456', fontWeight : 'bold', fontSize : '1.15em'}}>Similar Products :</span>
                        <ProductList products = {slicedProduct} showMore = {true}/>
                    </div>
                </div>
            </div>
        );
    }
}

function getProductBySku (products, selectedProductSku) {
    const product = products.filter( product => product.sku == selectedProductSku);
    return product[0];
}

function mapStateToProps(state, ownProps) {
    const selectedProductSku = ownProps.match.params.id;
    const products = state.products.Products;
    let product = {};

    if (selectedProductSku && products.length > 0) {
        product = getProductBySku(products, selectedProductSku);
    }
    
    return {
        user: state.user,
        product : product
    };
}

function mapActionsToProps (dispatch) {

}

export default connect(mapStateToProps, mapActionsToProps)(ViewProduct);