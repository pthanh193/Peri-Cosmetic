import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

const Login = ( {history, location}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {isAuthenticated, error, loading } = useSelector(state => state.auth)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(isAuthenticated) {
            history.push(redirect)
        }

        // if(error){
        //     alert.error(error);
        //     dispatch(clearErrors());
        // }
    }, [dispatch, alert, isAuthenticated, error])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Đăng nhập'} />

                    <div className="row wrapper"> 
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3 text-center">Đăng nhập</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="py-2">
                                    <div className="form-group">
                                        <label htmlFor="password_field">Mật khẩu</label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                            <div className="row">
                                <div className="col-6 col-md-3 text-left ">
                                    <Link to="/register" className="float-left link-cap" >Đăng ký</Link>
                                    </div>
                                <div className="col-6 col-md-6 text-center">
                                <Link to="/password/forgot" className="float-right  link-cap">Quên mật khẩu?</Link>
                                </div>
                                <div className="col-6 col-md-3 text-end">
                                    <Link to="" onClick={() => history.goBack()} className="float-right  link-cap">Trở về</Link>
                                </div>
                            </div>
                            
                            
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block"
                                    style={{width: "355px"}}
                                    >
                                    Đăng nhập
                                </button>
                            
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login