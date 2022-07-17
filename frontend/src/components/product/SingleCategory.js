import React, {useEffect, Fragment, useState} from 'react'
import { useAlert } from 'react-alert';
import {Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';
import {getCategoryDetails,} from "../../actions/categoryActions";
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product';
import MetaData from '../layouts/MetaData';
import {getProducts} from '../../actions/productActions'
import Loader from '../layouts/Loader';


const SingleCategory = ({match}) => {
    const alert = useAlert();
    const dispatch = useDispatch()
    const keyword = match.params.keyword;
    const idCate = match.params.id;


    const {loading, products, error, productsCount, resPerPage, filteredProductsCount} = useSelector(state => state.products)
    const {categories} = useSelector(state => state.categories)
    const { brands } = useSelector((state) => state.brands);
    const {category} = useSelector(state => state.categoryDetails)

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 5000000])
    const [brand, setBrand] = useState('');


   
    useEffect(() => {

       dispatch(getCategoryDetails(idCate));
       dispatch(getProducts(keyword, currentPage, price,idCate, brand));
        
    }, [dispatch, alert, idCate, keyword, currentPage, price, brand])


    return (
        
       
    <Fragment>
    {loading ? <Loader/> :(
    
    <Fragment>
        <MetaData title="Thương hiệu"/>
        <div   className="row mt-2" >
        <h1  className="mt-3 ml-5" > {category.name} </h1>  
        <div className="row ml-3 mr-3 mb-3">  
         {products.map(product => (
                product.category === idCate ?
                        <Product key={product._id} product={product} col={3}/>
                :""
                        ))
                }
            
        </div>
        </div>
    </Fragment>
    )}
    </Fragment>
    )
        
    
}

export default SingleCategory