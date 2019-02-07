import  productApi from '../demoAPI/productsAPI'; 
import * as ActionType from '../constants/ActionType';

export function fetchProductSuccess (products) {
    
    return {type : ActionType.PRODUCT_FETCH, products};
}

export function fetchProducts () {
    return function (dispatch) {
        return productApi.getAllproducts().then(products => {
            
            dispatch(fetchProductSuccess(products));
        }).catch(err => { throw err})
    };
}