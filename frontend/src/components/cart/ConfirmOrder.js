import React , {Fragment} from 'react'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import {saveShippingInfo} from '../../actions/cartActions'
import {Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { createOrder } from "../../actions/orderActions";
import { removeItemFromCart } from "../../actions/cartActions";

const ConfirmOrder = ({history}) =>{


        const dispatch = useDispatch();
        const {cartItems, shippingInfo} = useSelector(state=> state.cart)
        const {user} = useSelector(state => state.auth)
        const orders = {orderItems: cartItems,   shippingInfo, };

        const itemsPrice = cartItems.reduce((acc,item) => acc + item.price * item.quantity,0)
        const shippingPrice = itemsPrice >= 300000 ? 0 : 30000;
        const totalPrice = itemsPrice + shippingPrice;

        orders.itemsPrice = itemsPrice;
        orders.shippingPrice = shippingPrice;
        orders.totalPrice = totalPrice;

        const processToPayment = () => {
            const data = {
                itemsPrice,
                shippingPrice,
                totalPrice
            } 

            sessionStorage.setItem('orderInfo', JSON.stringify(data))
            history.push('/payment')
        }

        const submitHandler = async (e) => {
            e.preventDefault();
            orders.paymentInfo = {
              status: "Chưa thanh toán",
            };
        
            dispatch(createOrder(orders));
            cartItems.map((item) => dispatch(removeItemFromCart(item.product)));
        
            history.push("/success");
          };
    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder/>

            <div className="row d-flex justify-content-between">
            <div className="card ">
                <div className="order-confirm">
                    
                    <h4 className="mb-3 mt-3"> Địa chỉ nhận hàng </h4>
                   
                        <p><b>Tên:</b>  {user && user.name}</p>
                        <p><b>Số điện thoại:</b> {shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Địa chỉ:</b> {`${shippingInfo.address}, ${shippingInfo.xa}, ${shippingInfo.huyen}, ${shippingInfo.city}`}
                        </p>

                </div>
                    <hr />
                <div className="row">
                    <div className="col-6">
                        <h4 className="mt-4">Sản phẩm</h4>
                    </div>
                    <div className="col-2">
                        <h6 className="mt-4" style={{textAlign:"right", marginRight:"15px"}}>Đơn giá</h6>
                    </div>

                    <div className="col-2">
                        <h6 className="mt-4" style={{textAlign: "left"}}>Số lượng</h6>
                    </div>


                    <div className="col-2">
                        <h6 className="mt-4" style={{textAlign:"right", marginRight:"5px"}}>Thành tiền</h6>
                    </div>
                </div>
                    {cartItems.map(item =>(
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-2 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65"/>
                                    </div>
        
                                    <div className="col-6 col-lg-4" >
                                        <Link style={{color: "#212529"}} to={`/product/${item.product}`}>{item.name} </Link>
                                    </div>
                                    
                                    <div className="col-2 col-lg-2" style={{textAlign: "right"}}>
                                        <CurrencyFormat value={(item.price)} 
                                        displayType={'text'} thousandSeparator={true}/>đ
                                    </div>

                                    <div className="col-1 col-lg-1 text-center">
                                        <p>{item.quantity}</p>
                                    </div>
        
                                    <div className="col-4 col-lg-3 mr-3">
                                        <p style={{textAlign: "right", marginRight:"3px"}}> 
                                            <CurrencyFormat value={(item.quantity*item.price)} 
                                            displayType={'text'} thousandSeparator={true}/>đ
                                        </p>
                                    </div>
        
                                </div>
                            </div>
                            
                        </Fragment>
                    ))}
                </div>
                        
                    
                
                
                        <div id="order_summary">
                            <p style={{textAlign:"right"}}>Tổng tiền hàng:  <span >
                                <CurrencyFormat value={itemsPrice} displayType={'text'} thousandSeparator={true}/>đ
                            </span></p>
                            <p style={{textAlign:"right"}}>Phí vận chuyển: <span>
                                <CurrencyFormat value={shippingPrice} displayType={'text'} thousandSeparator={true}/>đ
                            </span></p>
                            

                            <p style={{textAlign:"right"}}>Tổng thanh toán: <span >
                                <CurrencyFormat value={totalPrice} displayType={'text'} thousandSeparator={true}/>đ
                            </span></p>

                            {/* <button id="checkout_btn" className="btn btn-primary btn-block" 
                            style={{float: "right"}}
                            onClick={processToPayment}>Đặt hàng</button> */}

                            <p style={{textAlign:"right"}}>Phương thức thanh toán: <span > 
                                {shippingInfo.method}                      
                            </span></p>

                                {shippingInfo && shippingInfo.method == "Thanh toán qua thẻ" ? (
                                <button
                                id="checkout_btn" className="btn btn-primary btn-block" style={{float: "right"}}
                                    onClick={processToPayment}
                                >
                                    Thanh toán
                                </button>
                                ) : (
                                <button
                                    id="checkout_btn" className="btn btn-primary btn-block" style={{float: "right"}}
                                    onClick={submitHandler}
                                >
                                    Đặt hàng
                                </button>
                                )}
                            
                        </div>
               
            </div>
        </Fragment>
    )
}

export default ConfirmOrder