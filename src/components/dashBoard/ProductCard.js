import React from 'react';

const ProductCard = ({name, thumbnailURL, price, offerIDs}) => {
    return (
        <div className = "card" style={{width: '200px', margin : '8px'}}>
            <img  className= "card-img-top" src={thumbnailURL} alt="Card Pic cap" style={{height: '100px', padding : '8px'}}/>
            <div className="card-body">
                <h6  className= "card-subtitle mb-2 text-muted">{name}</h6>
                <h5  className= "card-title">Rs. {price}</h5>
                <span  className= "card-text" style={{color: 'red '}}>{'OFFERS : ' + offerIDs.length}</span>
            </div>
        </div>
    );
}

export default ProductCard;