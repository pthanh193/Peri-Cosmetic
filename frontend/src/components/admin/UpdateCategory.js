import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CATEGORY_RESET } from '../../constants/categoryConstants'
import { getCategoryDetails, getCategories,updateCategory, clearErrors } from '../../actions/categoryActions'


const UpdateCategory= ({match, history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [name, setName] = useState('');


    const { loading, error: updateError, isUpdated } = useSelector(state => state.category);
    const {error, category} = useSelector(state => state.categoryDetails)
    const cateId = match.params.id;

    useEffect(() => {

        dispatch(getCategories());

        if(category && category._id !== cateId){
            dispatch(getCategoryDetails(cateId))
        }else{
            setName(category.name);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            alert.success('Thay đổi thông tin loại sản phẩm thành công.');
            history.push('/admin/categories');
            dispatch({ type: UPDATE_CATEGORY_RESET })
        }


    }, [dispatch, alert, error, history, updateError,isUpdated,  category, cateId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);

        dispatch(updateCategory(category._id,formData));
    }

    return(
        <Fragment>
            <MetaData title={'Thay đổi thông tin loại sản phẩm'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4 text-center">Thay đổi thông tin loại sản phẩm</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Tên loại sản phẩm</label>
                                    <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block float-end"
                                    disabled={loading ? true : false}
                                >
                                    Cập nhật
                            </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateCategory