import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

const Profile = () => {

    const {user, loading} = useSelector(state =>state.auth)
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'}/>

                    <h2 className="mt-5 ml-5">Tài khoản của tôi</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3 ">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            
                            <Link to="/me/update" id="edit_profile" style={{marginLeft: "42px"}} className="btn btn-primary btn-block my-5">
                                Thay đổi thông tin
                            </Link>
                            
                        </div>
                
                        <div className="col-12 col-md-5">
                            <h4>Họ và tên</h4>
                            <p>{user.name}</p>
                
                            <h4>Email</h4>
                            <p>{user.email}</p>

                            {user.role !== 'admin' && (
                                <div className="row">
                                
                                    <Link to="/orders/me" style={{width: "200px"}} className="btn btn-danger btn-block mt-3">
                                        Đơn mua
                                    </Link>
                                </div>
                            )}
                            
                            <div className="row">
                                <Link to="/password/update" style={{width: "200px"}} className="btn btn-primary btn-block mt-3">
                                    Thay đổi mật khẩu
                                </Link>
                            </div>

                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

}

export default Profile