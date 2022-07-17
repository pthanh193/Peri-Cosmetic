import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import CurrencyFormat from 'react-currency-format'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder,getOrderDetails, clearErrors,cancelOrder } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import Moment from 'react-moment';
import swal from 'sweetalert'
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal';
import {newReview,getProductDetails} from '../../actions/productActions';
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const OrderDetails = ({match, history}) => {
    // const [status, setStatus] = useState("");
    // const [deliveredAt, setDeliveredAt] = useState("");

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const {error: reviewError, success} = useSelector(state => state.newReview)

    const [idReview, setIdReview] = useState('')    
    
    const alert = useAlert()
    const dispatch = useDispatch()

    const {loading, error, order = {} } = useSelector(state => state.orderDetails)
    const {isUpdated} = useSelector(state => state.order)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus ,shippingPrice, itemsPrice} = order;
    
    const orderID = match.params.id;


    useEffect(() => {
        dispatch(getOrderDetails(orderID));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
          }

        if(isUpdated) {
            dispatch({ type: UPDATE_ORDER_RESET })

        }

        if(success){
            alert.success('Đánh giá thành công');
            
            dispatch({type:NEW_REVIEW_RESET })
          }

          
    }, [dispatch, alert, error,history, orderID, success, isUpdated])

    const shippingDetails = shippingInfo &&  `${shippingInfo.address}, ${shippingInfo.xa}, ${shippingInfo.huyen}, ${shippingInfo.city}`

    const isPaid = paymentInfo && paymentInfo.status ==='succeeded' ? true : false

    const isShipped = orderStatus && orderStatus ==='Giao hàng thành công' ? true : false 
    
    const isCanceled = orderStatus && orderStatus ==='Đã hủy' ? true : false 


    const submitHandler =  (id) => {

        swal({
            title: "Bạn có chắc chắn muốn hủy đơn hàng không?",
            //text: "Các thông tin sau khi xóa sẽ không thể khôi phục được nữa!",
            icon: "warning",
            buttons: ["Trở về", "Hủy đơn hàng"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch(cancelOrder(id));
            
              swal("Hủy đơn hàng thành công.", {
                icon: "success",
              });
            } else {
              swal("Đơn hàng chưa được hủy.");
            }
          });
    
        history.push(`/order/${id}`);
      };

      function setUserRatings (id) {
        setIdReview(id);

        const stars = document.querySelectorAll(['.star']);

        stars.forEach((star, index) => {
            star.starValue = index +1;            
    
            ['click', 'mouseover', 'mouseout'].forEach(function(e){
                star.addEventListener(e, showRatings);
            })
        })
    
        function showRatings(e){
          stars.forEach((star, index)=> {
            if(e.type ==='click'){
              if(index < this.starValue){
                star.classList.add('orange');
    
                setRating(this.starValue)
              } else {
                star.classList.remove('orange')
              }
            }
    
            if(e.type ==='mouseover'){
              
              if(index < this.starValue){
                star.classList.add('yellow');
              } else {
                star.classList.remove('yellow')
              }
            }
    
            if(e.type ==='mouseout'){
              star.classList.remove('yellow')
              
            }
          })
        }
      }
      
    
      const reviewHandler=() => {
        const formData = new FormData();
    
        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', idReview);
    
        dispatch(newReview(formData)); 
    
      }

    return (
        <Fragment>
            <MetaData title={'Chi tiết đơn hàng'}/>
             
             {loading ? <Loader/> : (
                 <Fragment>
                   
                    <div className="row order-details">
                        <h1 className="my-5">Chi tiết đơn hàng #{order._id}</h1>
                        <div className= "card">
                            <div className="card-header">

                            
                                <div className='float-start'>
                                    <h4 className="mb-4">Thông tin nhận hàng</h4>
                                    <p><b>Tên:</b> {user && user.name}</p>
                                    <p><b>Số điện thoại:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Địa chỉ:</b> {shippingDetails}</p>
                                </div>

                                <div className='float-end'>
                                    <div className="process-order my-3" >
                                    
                                        <h6>Ngày đặt hàng: <b><Moment format="DD/MM/YYYY  h:mm:ssA">{order.createAt}</Moment></b>
                                        </h6> 

                                        <h6>Trạng thái đơn hàng:<p className={order.orderStatus && 
                                        String(order.orderStatus).includes('Giao hàng thành công' ) ? 'greenColor' : "redColor"} ><b>{orderStatus}</b></p>
                                        </h6>                       
                                        
                                        <h6 >Thanh toán:<p className={isPaid  || isShipped ? "greenColor" : "redColor"} >
                                        <b>{isPaid || isShipped ? "Đã thanh toán ": "Chưa thanh toán"}</b></p>
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
                                </div>
                            </div>
                            
                            <div className='card-body'>
                                            
                            <h4 className="mb-4">Sản phẩm: </h4>
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item=>(
                                    <div key={item.product} className="row">
                                        <div className="col-md-2">
                                            <img src={item.image} alt={item.name} height="70" width="65" />
                                        </div>

                                        <div className="col-md-6">
                                            <Link to={`/product/${item.product}`}>{item.name} x{item.quantity}</Link>
                                        </div>
                                        
                                        <div className="col-md-2 float-end">
                                            <CurrencyFormat value={item.price} displayType={'text'} 
                                            thousandSeparator={true}/>đ
                                        </div>  
                                        
                                        {isShipped 
                                        ?
                                        <div className="col-md-2 float-end">
                                        
                                    
                                            <button id="review_btn" type="button" className="btn btn-primary"
                                            data-toggle="modal" data-target="#ratingModal"
                                            onClick={()=> setUserRatings(item.product)}>
                                                Đánh giá
                                            </button>

                                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Đánh giá sản phẩm</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                    </div>
                                                    <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review" id="review" className="form-control mt-3"
                                                    value={comment}
                                                    onChange={(e) =>setComment(e.target.value)}>

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-body float-end" 
                                                    data-dismiss="modal" aria-label="Close"
                                                    onClick={() => reviewHandler()}>Đánh giá</button>
                                                </div>
                                            </div>
                                        </div>
                                            </div>

                                        </div>  

                                        :""}

                                    </div>
                                ))}
                               
                            </div>
                            </div>
                            <div className='card-footer '>
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
                                <br/>
                                <br/>
                                {order.orderStatus === "Đang xử lý" ?
                                <button
                                    id="checkout_btn" className="btn btn-block float-end"
                                    onClick={() => submitHandler(order._id)}                                  
                                >
                                    Hủy đơn hàng
                                </button>
                                : ""
                                }
                            </div>

                            
                        </div>

                    </div>

                 </Fragment>
             )}
        </Fragment>
    )
}

export default OrderDetails