import React, {Fragment, useState, useEffect} from 'react'
import MetaData from './layouts/MetaData'
import Loader from './layouts/Loader';
import Banner from './layouts/Banner';
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import {getProducts} from '../actions/productActions'
import { getCategories } from "../actions/categoryActions";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Carousel } from "react-bootstrap";
import Brand from './product/Brand'; 
import Product from './product/Product';
import { getBrands } from '../actions/brandActions';


const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const  Home = ({ match }) =>{

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
    const reBrand = brands.slice(0, 4);
    const reBrand2 = brands.slice(1,5);

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
                    {!keyword && !category && !brand && currentPage == 1 && (
                    <div
                        className="row"
                        style={{ margin: "0 -10rem 1rem -8.5rem", paddingLeft:"3px",
                        width:"1375px",
                        }}
                    >
                        <Banner />
                    </div> 
                    )}
                    <MetaData title={'Buy Best Cosmetic Online'}/>

                    <section  id="products" className="container mt-2">
                        <div class="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-4">
                                            <div>
                                                <h4 > Danh mục</h4>
                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                           
                                                            key={category}
                                                            onClick={() => setCategory(category._id)}
                                                          
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
                                                    key={brand}
                                                    onClick={() => setBrand(brand._id)}
                                                    className="list-menu"
                                                    >
                                                    
                                                    {brand.name}
                                                    </li>
                                                ))}
                                            </ul>
                                            </div>

                                            <hr className="my-5"/>

                                            <p>Lọc sản phẩm theo giá</p>

                                        
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
                                    
                                    <div className="col-6 col-md-9 mt-3">
                                        <h3>Tìm được {products && products.length} sản phẩm</h3>
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                {!keyword && !brand && !category && currentPage == 1 && (
                                    <div className="row shadow rounded"
                                    style={{                                                   
                                        borderTop: "4px solid #6868ac",
                                        margin: "0",
                                        width: "100%",
                                        backgroundColor: "#fcf7ff",
                                    }}> 
                    
                                < h4 className="mt-3 ml-5" id="products_heading">SẢN PHẨM MỚI NHẤT</h4>
                                    {products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))}
                                </div>
                                )}
                                </Fragment>
                            )}  
                        </div>
                    </section>
                                 
                    {!keyword && !brand &&  !category &&  currentPage == 1 && (
                    
                    <div
                      className="row shadow rounded mt-5"
                      style={{
                       
                        borderTop: "4px solid #6868ac",
                        margin: "0",
                        width: "100%",
                        backgroundColor: "#fcf7ff",
                      }}
                    >
                      <h4
                        className="mt-3 ml-5"
                      >
                        THƯƠNG HIỆU NỔI BẬT
                      </h4>
                      <div className="col-12 ml-3 mr-3 mb-3 pr-3">
                        <Carousel
                          pause="hover"
                          style={{ paddingRight: "2rem" }}
                        >
                          <Carousel.Item>
                            <div className="row">
                              {reBrand.map((br) => (
                                <Brand key={br._id} brand={br} />
                              ))}
                            </div>
                          </Carousel.Item>
                          <Carousel.Item>
                            <div className="row">
                              {reBrand2.map((br) => (
                                <Brand key={br._id} brand={br} />
                              ))}
                            </div>
                          </Carousel.Item>
                        </Carousel>
                      </div>
                    </div>


                  )}

                    {/* {resPerPage <= count && (
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
                    )} */}
                </Fragment>
                )}
        </Fragment>


    )
}
 
export default Home