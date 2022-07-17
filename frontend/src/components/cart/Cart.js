import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import {addItemToCart, removeItemFromCart} from '../../actions/cartActions'
import CurrencyFormat from 'react-currency-format'

const Cart = ({history}) => {
  const dispatch = useDispatch();

  const {cartItems} = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity +1;

    if(newQty > stock) return;

    dispatch(addItemToCart(id,newQty))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  const decreaseQty = (id, quantity) => {
    const newQty = quantity -1;

    if(newQty <= 0) return;

    dispatch(addItemToCart(id,newQty))
  }

    return (
        <Fragment>
          <MetaData title={'Giỏ hàng'}/>
          {cartItems.length === 0 ?
          <div>
           <h2 className="mt-5">Giỏ hàng rỗng</h2> 
           <img className="my-5 img-fluid d-block mx-auto" src="../images/empty.jpg" alt="Empty Cart" width="300" height="300" />
           <Link to="/" className="my-5 mx-auto img-fluid d-block text-center text-black cart-link">Quay lại trang chủ</Link>
          </div>
           : (
            <Fragment>
              <h2 className="mt-5">Giỏ hàng</h2>
              
              <div className="row d-flex justify-content-between">
                  <div className="col-12 col-lg-8">
                      
                      {cartItems.map(item=> (
                        <Fragment>
                      <hr />
                      <div className="cart-item" key={item.product}>
                          <div className="row">
                              <div className="col-4 col-lg-2">
                                  <img src={item.image} alt={item.name} height="90" width="115"/>
                              </div>

                              <div className="col-5 col-lg-4" style={{color: "black"}}>
                                  <Link to={`product/${item.product}`} style={{color: "#212529"}}>{item.name}</Link>
                              </div>


                              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true}/>đ
                              </div>

                              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                  <div className="stockCounter d-inline">
                                      <span className="btn btn-danger minus" onClick={ ()=>decreaseQty(item.product, item.quantity)}>-</span>
                                      <input type="number" style={{marginRight: "-15px"}} className="form-control count d-inline" value={item.quantity} readOnly />

                      <span className="btn btn-primary plus" onClick={ ()=> increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                  </div>
                              </div>

                              <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                  <i id="delete_cart_item" className="fa fa-trash btn btn-danger"
                                  onClick={()=> removeCartItemHandler(item.product)}></i>
                              </div>

                          </div>
                      </div>
                      <hr />
                      </Fragment>
                      ))}
                  </div>

                  <div className="col-12 col-lg-3 my-4">
                      <div id="order_summary">
                          
                          <p>Tổng sản phẩm:  <span class="order-summary-values">
                              {cartItems.reduce((acc,item)=> (acc + Number(item.quantity)),0)}
                              </span></p>
                          <p>Tổng số tiền: <span class="order-summary-values">
                            <CurrencyFormat value={cartItems.reduce((acc,item)=> acc+item.quantity*item.price,0)}  
                            displayType={'text'} thousandSeparator={true}/>đ
                          </span></p>
          
                          <hr />
                          <button id="checkout_btn" 
                          className="float-end btn btn-primary btn-block"
                          onClick={()=>checkoutHandler()}
                          >Thanh toán</button>
                      </div>
                  </div>
              </div>
            </Fragment>
          )}
        </Fragment>
    )
}

export default Cart