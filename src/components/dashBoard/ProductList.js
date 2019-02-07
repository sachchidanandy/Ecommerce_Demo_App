import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({products}) => {
    return (
        <div className = 'row'>
            {products.map(product => <ProductCard key = {product.sku} {...product}/>)}
        </div>
    );
}
export default ProductList;