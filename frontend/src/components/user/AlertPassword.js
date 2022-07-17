import React , {Fragment, useEffect} from 'react'
import MetaData from '../layouts/MetaData'
import {Link} from 'react-router-dom'

const AlertPassword = () => {
    return (
        <Fragment>
            <MetaData title={'Forgot Password'}/>
            <div className="row justify-content-center">
            <div className="col-8 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="../../images/checked.png" alt="Order Success" width="200" height="200" />

                <h2>Gửi email thành công. Vui lòng truy cập đến đường dẫn nhận được trong email để đặt lại mật khẩu mới. </h2>
                <Link className="btn btn-block"  to="/" style={{paddingRight: "50px"}}>Trang chủ</Link>
            </div>

        </div>
        </Fragment>
    )
}

export default AlertPassword