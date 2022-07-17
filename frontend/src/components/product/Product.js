import React from 'react'
import {Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cartActions";
import { useAlert } from 'react-alert';

const Product = ({product, col}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const addToCart = (id) => {
        dispatch(addItemToCart(id, 1));
        alert.success('Sản phẩm đã được thêm vào giỏ hàng');
      };

    return (
        <div key={product._id} className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img className="card-img-top mx-auto"
                    src={product.images[0].url}/>
                <div className="card-body d-flex flex-column" style={{paddingRight: "0px"}}>
                <h5 className="card-title">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h5>
                <div className="ratings mt-auto" >          
                    <div className="rating-outer">
                        <div className="rating-inner" style={{width: `${(product.ratings/5)*100}%`}}></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} đánh giá)</span>
                </div>
                <p className="card-text">
                <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true}/>đ
                </p>
                {/* <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">Xem Chi Tiết</Link>
                </div>

                <div className="col-12 col-md-2" style={{ marginLeft: "-15px" }}>
                <i
                    className="fa fa-cart-plus hover-add-item"
                    aria-hidden="true"
                    disabled={product.stock === 0}
                    onClick={(e) => addToCart(product._id)}
                ></i>
                </div> */}
                <div className="row">
                    <div className="col-12 col-md-9">
                    <Link
                        to={`/product/${product._id}`}
                        id="view_btn"
                        className="btn btn-block"
                    >
                        Xem chi tiết
                    </Link>
                    </div>
                    <div className="col-12 col-md-3 text-center" style={{ marginLeft: "-15px" }}>
                        <i
                            className="fa fa-2x fa-cart-plus " style={{color:"#6868ac"}}
                            aria-hidden="true"
                            disabled={product.stock === 0}
                            onClick={(e) => addToCart(product._id)}
                        ></i>
                    </div>
                    </div>
                    </div>

                
            </div>
        </div>
    )
}

export default Product