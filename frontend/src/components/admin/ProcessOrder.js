import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { Link } from 'react-router-dom'
import Loader from "../layouts/Loader";
import CurrencyFormat from "react-currency-format";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, getOrderDetails, clearErrors } from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Moment from 'react-moment';

const ProcessOrder = ({match}) => {

  const [status, setStatus] = useState("");
  const [deliveredAt, setDeliveredAt] = useState("");


  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order={} } = useSelector((state) => state.orderDetails);
  const {shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus, itemsPrice, shippingPrice} = order;
  const {error, isUpdated} = useSelector(state => state.order);


  const orderId = match.params.id;

  useEffect(() => {
    document.body.scrollTo(0,0);
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Thay đổi trạng thái đơn hàng thành công.");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {

    const formData = new FormData();
    formData.set("status", status);

    if(status==='Giao hàng thành công' || status==='Đã hủy'){
      formData.set('deliveredAt', Date.now);
    }
  
    dispatch(updateOrder(id, formData));
  };


  const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.xa}, ${shippingInfo.huyen}, ${shippingInfo.city}`

  const isPaid = paymentInfo && paymentInfo.status ==='succeeded' ? true : false
  const isShipped = orderStatus && orderStatus ==='Giao hàng thành công' ? true : false 
  const isCanceled = orderStatus && orderStatus ==='Đã hủy' ? true : false 


  return (
    <Fragment>
    <MetaData title={'Admin - Thay đổi trạng thái đơn hàng'}/>
    <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
    

        <div className='col-12 col-md-10' >
            <Fragment>
            {loading ? <Loader/> : (
                 <Fragment>
                    <div className="row">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-3">Chi tiết đơn hàng #{order._id}</h1>

                            <div className="process-order my-3" >

                            <h6>Ngày đặt hàng: <b><Moment format="DD/MM/YYYY h:mm:ssA">{order.createAt}</Moment></b>  </h6>  
                            
                              <h6>Trạng thái đơn hàng:<p className={order.orderStatus && 
                                String(order.orderStatus).includes('Giao hàng thành công' ) ? 'greenColor' : "redColor"} ><b>{orderStatus}</b></p>
                              </h6>  
                              
                              <h6>Thanh toán:<p className={isPaid || isShipped ? "greenColor" : "redColor"} >
                                <b>{isPaid || isShipped ? "Đã thanh toán" : "Chưa thanh toán"}</b></p>
                              </h6>

                              {isShipped ?
                              <h6>Ngày giao hàng: <b><Moment format="DD/MM/YYYY h:mm:ssA">{order.deliveredAt}</Moment></b>  </h6> 
                              : ""                             
                              }

                              {isCanceled?
                              <h6>Đã hủy: <b><Moment format="DD/MM/YYYY h:mm:ssA">{order.deliveredAt}</Moment></b>  </h6> 
                              : ""                             
                              }
                            </div>

                            <hr/>

                            <h4 className="mb-4">Thông tin nhận hàng</h4>
                            <p><b>Tên:</b> {user && user.name}</p>
                            <p><b>Số điện thoại:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Địa chỉ:</b> {shippingDetails}</p>
                            <hr />

                            <h4 className="mb-4">Sản phẩm trong đơn hàng:</h4>

                            
                            <div className="cart-item my-1">
                              {orderItems &&
                                orderItems.map((item) => (
                                  <div key={item.product} className="row my-5">
                                    <div className="col-4 col-lg-2">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        height="45"
                                        width="65"
                                      />
                                    </div>

                                    <div className="col-5 col-lg-5" style={{color:"#212529"}}>
                                      <Link to={`/product/${item.product}`}>
                                        {item.name} x{item.quantity}
                                      </Link>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                      <p>{<CurrencyFormat value={item.price} displayType={'text'} 
                                        thousandSeparator={true}/>} đ</p>
                                    </div>

                                    
                                  </div>
                                ))}
                            </div>
                            <hr/>

                            <h6 className='float-end'>Tổng tiền hàng:  <span >
                                    <CurrencyFormat value={itemsPrice} displayType={'text'} thousandSeparator={true}/>đ
                                </span></h6>
                                <br/>
                                <br/>
                                <h6 className='float-end'>Phí vận chuyển: <span>
                                    <CurrencyFormat value={shippingPrice} displayType={'text'} thousandSeparator={true}/>đ
                                </span></h6>
                                <br/>
                                <br/>

                                <h6 className='float-end'><b>Tổng tiền đơn hàng: </b> 
                                    <CurrencyFormat value={totalPrice} displayType={'text'} thousandSeparator={true}/>đ
                                </h6>

                        </div>
                        
                        {isShipped || isCanceled ? "":
                        <div className="col-12 col-lg-3 mt-5">
                          
                          <h4 className="my-4">Cập nhật trạng thái đơn hàng:</h4>

                          <div className="form-group">
                            <select
                              className="form-control"
                              name="status"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="Đang xử lý">Đang xử lý</option>
                              <option value="Đã xác nhận">Đã xác nhận</option>
                              <option value="Đang vận chuyển">Đang vận chuyển</option>
                              <option value="Giao hàng thành công">Giao hàng thành công</option>
                              <option value="Đã hủy">Đã hủy</option>
                            </select>
                          </div>

                          <button className="btn btn-block mb-5 mt-3 float-end" style={{backgroundColor: "#ffde22"}}
                            onClick={() => updateOrderHandler(order._id)}
                          >
                            Cập nhật
                          </button>
                        
                    
                        </div>
                        }
                    </div>
                 </Fragment>
             )}

               
            </Fragment>
        </div>
    </div>
    </Fragment>
  );
};

export default ProcessOrder;
