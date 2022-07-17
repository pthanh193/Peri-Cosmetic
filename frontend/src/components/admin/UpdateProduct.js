import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { getBrands } from '../../actions/brandActions'
import { getCategories } from '../../actions/categoryActions'

const UpdateProduct = ({match, history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [uses, setUses] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [use, setUse] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]) 
    const [imagesPreview, setImagesPreview] = useState([])


    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
    const {error, product} = useSelector(state => state.productDetails)
    const { brands } = useSelector((state) => state.brands);
    const { categories } = useSelector((state) => state.categories);

    const productId = match.params.id;

    useEffect(() => {

        dispatch(getBrands());
        dispatch(getCategories());

        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        }else{
            setName(product.name);
            setBrand(product.brand);
            setCategory(product.category);
            setPrice(product.price);
            setStock(product.stock);
            setDescription(product.description);
            setUses(product.uses );
            setIngredient(product.ingredient);
            setUse(product.use);
            setOldImages(product.images);
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
            alert.success('Thay đổi thông tin sản phẩm thành công.');
            history.push('/admin/products');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, history, updateError,isUpdated,  product, productId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('brand', brand);
        formData.set('uses', uses);
        formData.set('ingredient', ingredient);
        formData.set('use', use);
        formData.set('stock', stock);
        
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(product._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])


        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return(
        <Fragment>
            <MetaData title={'Thay đổi thông tin sản phẩm'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4 text-center">Thay đổi thông tin sản phẩm</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Tên</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className='py-2'>
                                    <div className="form-group">
                                        <label htmlFor="brand_field">Thương hiệu</label>
                                        <select
                                            type="text"
                                            id="brand_field"
                                            className="form-control"
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                        >
                                            <option>Vui lòng chọn thương hiệu sản phẩm</option>
                                                {brands &&
                                                brands.map((brand) => (
                                                <option key={brand} value={brand._id}>
                                                    {brand.name}
                                                </option>
                                                ))}
                                        </select>
                                    </div>  
                                </div> 

                                <div className="form-group">
                                    <label htmlFor="category_field">Loại sản phẩm</label>
                                    <select
                                        type="text"
                                        id="category_field"
                                        className="form-control"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}

                                    >
                                    <option>Vui lòng chọn loại sản phẩm</option>
                                        {categories &&
                                        categories.map((cate) => (
                                            <option key={cate} value={cate._id}>
                                            {cate.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='py-2'>
                                    <div className="form-group">
                                        <label htmlFor="price_field">Giá</label>
                                        <input
                                            type="text"
                                            id="price_field"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Số lượng</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                               
                                <div className='py-2'>
                                    <div className="form-group">
                                        <label htmlFor="description_field">Mô tả</label>
                                        <textarea className="form-control" id="description_field" rows="8" 
                                        value={description} onChange={(e) => setDescription(e.target.value)}>
                                        </textarea>
                                    </div>
                                </div>

                                <div className='py-2'>
                                    <div className="form-group">
                                        <label htmlFor="uses_field">Công dụng</label>
                                        <textarea className="form-control" id="uses_field" 
                                        rows="8" value={uses} 
                                        onChange={(e) => setUses(e.target.value)}></textarea>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ingredient_field">Thành phần</label>
                                    <textarea className="form-control" id="ingredient_field" rows="8" 
                                    value={ingredient} onChange={(e) => setIngredient(e.target.value)}></textarea>
                                </div>

                                <div className='py-2'>
                                    <div className="form-group">
                                        <label htmlFor="use_field">Hướng dẫn sử dụng</label>
                                        <textarea className="form-control" id="use_field" rows="8" 
                                        value={use} onChange={(e) => setUse(e.target.value)}></textarea>
                                    </div>
                                </div>

                                <div className='form-group'>
                                    <label>Hình ảnh</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='form-control'
                                            id='formFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

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

export default UpdateProduct