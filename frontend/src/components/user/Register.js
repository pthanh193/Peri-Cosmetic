import React, {Fragment, useState, useEffect} from 'react'

import MetaData from '../layouts/MetaData'
import {useAlert} from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import { register, clearErrors} from '../../actions/userActions'


const Register = ({history }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')

    const alert = useAlert();
    const dispatch = useDispatch();

    const {isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if(isAuthenticated) {
            history.push('/')
        }

        // if(error){
        //     alert.error(error);
        //     dispatch(clearErrors());
        // }
    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
        dispatch(register(formData))
    }

    const onChange = e => {
      
      if(e.target.name ==='avatar'){
        console.log('fileName', e.target.files[0])
        const reader = new FileReader();

        reader.onload = () => {
          if(reader.readyState === 2){
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
          }
        }

        reader.readAsDataURL(e.target.files[0]);
      } else{
         setUser({ ...user, [e.target.name]: e.target.value })
      }
    }

    return (
        <Fragment> 
            <MetaData title={'Đăng ký'}/>

            <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mb-3 text-center">Đăng ký</h1>

          <div className="form-group">
            <label htmlFor="email_field">Họ và tên</label>
            <input 
                type="name"
                id="name_field" 
                className="form-control"
                name='name' 
                value={name}
                onChange={onChange} 
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
                onChange={onChange}
              />
            </div>
          </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Mật khẩu</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name='password' 
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="py-2">
              <div className='form-group'>
                <label htmlFor='avatar_upload'>Ảnh đại diện</label>
                <div className='d-flex align-items-center'>
                    <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarPreview}
                              className='rounded-circle'
                              alt='avt'
                          />
                      </figure>
                    </div>
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            className='form-control'
                            id='formFile'
                            accept='images/*'
                            onChange={onChange}
                        />
                    </div>
                    
                </div>
                </div>
              </div>

            <button
              id="register_button"
              type="submit"
              disable={loading ? true : false}
              className="btn btn-block mt-4 mb-3"
              style={{width: "355px"}}
            >
              Đăng ký
            </button>
          
          </form>
		  </div>
    </div>
        </Fragment>
    )
}

export default Register