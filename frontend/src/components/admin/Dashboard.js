import React, {Fragment, useEffect} from "react";
import {Link} from 'react-router-dom'
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from 'react-redux'
import {getAdminProducts, clearErrors} from '../../actions/productActions'
import { allUsers } from "../../actions/userActions";
import { allOrders } from "../../actions/orderActions";

const Dashboard =() => {

    const dispatch = useDispatch()

    const {products} = useSelector(state => state.products)
    const {users } = useSelector(state => state.allUsers)
    const {orders, totalAmount, loading} = useSelector(state => state.allOrders)

    useEffect(()=>{

        dispatch(getAdminProducts())
        dispatch(allUsers())
        dispatch(allOrders())

    }, [dispatch])

    let outOfStock = 0;
    products.forEach(products => {
        if(products.stock === 0)
            outOfStock +=1;
    })

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Tổng quan</h1>
                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Tổng thu<br /> 
                                                <CurrencyFormat value={totalAmount} displayType={'text'} 
                                                thousandSeparator={true}/>đ
                                            <b></b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Sản phẩm<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">Xem chi tiết</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Đơn hàng<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">Xem chi tiết</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Thành viên<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">Xem chi tiết</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Hết hàng<br />
                                             <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>


        </Fragment>
    )
}

export default Dashboard