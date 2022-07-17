import React, {Fragment, useState, useEffect} from 'react'
import MetaData from '../layouts/MetaData'

import { useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {updateProfile, loadUser, clearErrors} from '../../actions/userActions'
import {UPDATE_PROFILE_RESET} from '../../constants/userConstants'

const UpdateProfile = ({history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')

    const alert = useAlert();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth)
    const {isUpdated, error, loading } = useSelector(state => state.user)

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success('User updated successfully');
            dispatch(loadUser());

            history.push('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, alert, isUpdated, error, history])

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData))
    }

    const onChange = e => {
    
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <Fragment>
            <MetaData title={'Update Profile'}/>

            <div className="row wrapper">
                <div className="col-10 col-lg-6">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5 text-center">Thay đổi thông tin</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Họ và tên</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="py-2">
                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'style={{width: "375px", marginLeft:"25px"}}>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='form-control'
                                        id='formFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>


                        <button type="submit" style={{width: "450px"}} className="btn update-btn btn-block mt-4 mb-3" 
                        disable={loading ? true : false}>
                            Cập nhật
                        </button>
                       
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile