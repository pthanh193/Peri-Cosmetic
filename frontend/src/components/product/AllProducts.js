import React, {Fragment, useState, useEffect} from 'react'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader';
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import {getProducts} from '../../actions/productActions'
import { getCategories } from "../../actions/categoryActions";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Product from '../product/Product';
import { getBrands } from '../../actions/brandActions';


const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const  AllProducts = ({ match }) =>{

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 5000000])
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState("");


    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, products, error, productsCount, resPerPage, filteredProductsCount} = useSelector(state => state.products)
    const {categories} = useSelector(state => state.categories)
    const { brands } = useSelector((state) => state.brands);


    const keyword = match.params.keyword


    useEffect(() => {
        dispatch(getCategories());
        dispatch(getBrands());
        
        if(error){
            alert.success('Success')
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category, brand));

    }, [dispatch, alert, error, keyword, currentPage, price, category, brand])

    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    } 

    let count = productsCount;

    if (keyword) {
        count = filteredProductsCount
    }
 
    return (
        <Fragment>
            {loading ? <Loader/> :(
                <Fragment>
                    <MetaData title={'All Products'}/>
                    <h1 id="products_heading">Tất cả sản phẩm</h1>

                    <section  id="products" className="container mt-2">
                        <div class="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-2 mb-5">
                                        <div className="px-5">
                                            <div>
                                                <h4 > Danh mục</h4>
                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category._id}
                                                            onClick={() => setCategory(category)}
                                                          
                                                        >
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                            <h4 className="mb-3 sub-menu">Thương hiệu</h4>

                                            <ul className="pl-0">
                                                {brands &&
                                                brands.map((brand) => (
                                                    <li
                                                    key={brand._id}
                                                    onClick={() => setBrand(brand._id)}
                                                    className="list-menu"
                                                    >
                                                    <hr className="my-hr" />
                                                    {brand.name}
                                                    </li>
                                                ))}
                                            </ul>
                                            </div>

                                            <hr className="my-5"/>

                                            <hr className="my-5" />

                                            <p>Lọc sản phẩm theo giá sản phẩm</p>

                                        
                                            <Range
                                                marks={{
                                                    0: `0`,
                                                    2000000: `2000000`
                                                }}
                                                min={0}
                                                max={2000000}
                                                defaultValue={[0, 2000000]}
                                                tipFormatter={value => `${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                    products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                )}
                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage = {currentPage}
                                itemsCountPerPage = {resPerPage}
                                totalItemsCount = {productsCount}
                                onChange = {setCurrentPageNo}
                                
                                itemClass = "page-item"
                                linkClass = "page-link"
                            />
                        </div>
                    )}
                </Fragment>
                )}
        </Fragment>


    )
}
 
export default AllProducts