import React , {Fragment, useEffect} from 'react'
import MetaData from '../layouts/MetaData'
import {Link} from 'react-router-dom'

const OrderSuccess = () => {
    return (
        <Fragment>
            <MetaData title={'Order Success'}/>
            <div className="row justify-content-center">
            <div className="col-8 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="../images/checked.png" alt="Order Success" width="200" height="200" />

                <h2>Đơn hàng của bạn đã đặt thành công.</h2>
                <Link className="btn btn-block"  to="/" style={{paddingRight: "50px"}}>Trang chủ</Link>

                <Link className="btn btn-block" to="/orders/me" style={{paddingLeft: "30px"}}>Đơn mua</Link>
            </div>

        </div>
        </Fragment>
    )
}

export default OrderSuccess