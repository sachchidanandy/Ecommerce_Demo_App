import React from 'react';

const ProductDescription = ({name, brand, price, description, flavour, packSize}) => {
    return (
        <React.Fragment>
            <h2>
                <span>{name}</span>
            </h2>
            <span>by <a href = '#'>{brand}</a></span>
            <table>
                <tr>
                    <td style = {{fontWeight : 'bold', fontSize : '1.15em'}}>Price : </td>
                    <td><h4>{price} Rs.</h4></td>
                </tr>
                <tr style = {{fontWeight : 'bold', fontSize : '1.15em'}}>
                    <td>Description : </td>
                    <td>{ description }</td>
                </tr>
                <tr style = {{fontWeight : 'bold', fontSize : '1.15em'}}>
                    <td>Flavour : </td>
                    <td>{ flavour }</td>
                </tr>
                <tr style = {{fontWeight : 'bold', fontSize : '1.15em'}}>
                    <td>Size : </td>
                    <td>{ packSize }</td>
                </tr>
                <tr>
                    <td>Quantity : </td>
                    <td><button>+</button><input type = 'number' min = {0} style = {{margin : '5px'}}/><button>-</button></td>
                </tr>
                <tr>
                    <td><button style= {{ padding : '5px',margin : '10px', maxWidth : '100%'}}className = 'btn btn-block btn-primary'>Add to Cart</button></td>
                    <td><button style= {{ padding : '5px',margin : '10px', maxWidth : '50%'}}className = 'btn btn-block btn-success'>Buy Now</button></td>
                </tr>
            </table>
        </React.Fragment>
    );
}

export default ProductDescription;