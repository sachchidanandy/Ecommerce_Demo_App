import React from 'react';

const ProductCard = () => {
    return (
        <div className = "card" style={{width: '200px', height: '170px'}}>
            <img class="card-img-top" src="http://www.coca-cola.ie/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg" alt="Card image cap" style={{height: '100px'}}/>
            <div className="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Product Name</h6>
                <h5 class="card-title">Product Price</h5>
                <p class="card-text"></p>
            </div>
        </div>
    );
}

export default ProductCard;