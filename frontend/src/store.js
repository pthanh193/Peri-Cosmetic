import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import { productsReducer,newProductReducer, productDetailsReducer, productReducer,
     newReviewReducer,productReviewsReducer,allReviewsReducer,reviewReducer } from './reducers/productReducers';
import {authReducer, userReducer, forgotPasswordReducer,allUsersReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'
import {newOrderReducer,myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from './reducers/orderReducers'
import {brandsReducer, newBrandReducer, brandReducer, brandDetailsReducer,getBrandsReducer } from "./reducers/brandReducers";
import {categoriesReducer, newCategoryReducer, categoryReducer, categoryDetailsReducer} from './reducers/categoryReducers'
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,

    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,

    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,

    brands: brandsReducer,
    newBrand: newBrandReducer,
    brand: brandReducer,
    brandDetails: brandDetailsReducer,
    getBrandSlug: getBrandsReducer,

    categories: categoriesReducer,
    newCategory: newCategoryReducer,
    category: categoryReducer,
    categoryDetails: categoryDetailsReducer,

    allUsers:allUsersReducer,

    productReviews: productReviewsReducer,
    allReviews: allReviewsReducer,
    review: reviewReducer,

})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;