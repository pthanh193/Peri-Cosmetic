import React, {Fragment, useState, useEffect} from 'react'
import MetaData from '../layouts/MetaData'

import { useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {updatePassword, clearErrors} from '../../actions/userActions'
import {UPDATE_PASSWORD_RESET} from '../../constants/userConstants'

const UpdatePassword = ({history}) => {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const {isUpdated, error, loading } = useSelector(state => state.user)

    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success('Password updated successfully');

            history.push('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, alert, isUpdated, error, history])

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        
        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Thay đổi mật khẩu'}/>
            
            <div className="row wrapper">
                <div className="col-10 col-lg-6">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5 text-center ">Thay đổi mật khẩu</h1>
                        <div className="form-group" style={{width:"365px", marginLeft:"45px", marginRight: "15px"}}>
                            <label for="old_password_field">Mật khẩu cũ</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="py-2">
                            <div className="form-group" style={{width:"365px", marginLeft:"45px", marginRight: "15px"}}>
                                <label for="new_password_field">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        
                        <button type="submit" style={{width:"365px", marginLeft:"45px", marginRight: "15px"}}
                        className="btn update-btn btn-block mt-4 mb-3" 
                        disabled={loading ? true : false} >
                            Cập nhật
                        </button>
                       
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword