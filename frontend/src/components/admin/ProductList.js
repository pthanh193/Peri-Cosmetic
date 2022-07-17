import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import swal from "sweetalert"
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {getAdminProducts,deleteProduct, clearErrors} from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'


const ProductList = ({history}) => {
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);
    const {error: deleteError, isDeleted} = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if(isDeleted){
            //alert.success('Xóa sản phẩm thành công');
            history.push('/admin/products')
            dispatch({type: DELETE_PRODUCT_RESET})
        }
    }, [dispatch, alert, history,error, deleteError, isDeleted])

    function format(n, currency) {
        return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + currency;
      }

    const deleteProductHandler=(id) =>{

        swal({
            title: "Bạn có chắc không?",
            text: "Các thông tin sau khi xóa sẽ không thể khôi phục được nữa!",
            icon: "warning",
            buttons: ["Hủy", "Xóa"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteProduct(id))
                swal("Xóa sản phẩm thành công.", {
                icon: "success",
              });
            } else {
              swal("Sản phẩm chưa được xóa.");
            }
          });
    }

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Mã sản phẩm',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên sản phẩm',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Giá',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Số lượng',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: '',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `${product.price && format(product.price, "đ")}`,
                stock: product.stock,
                actions:
                <Fragment> 
                    <Link to={`/admin/product/${product._id}`} px
                    className=" py-1 px-3 btn btn-primary" style={{paddingRight: "8px"}}>
                        <i className="fa fa-edit"></i>
                    </Link>

                    <button className='btn btn-danger py-1 px-3 ml-2' 
                    onClick={ ()=> deleteProductHandler(product._id)}>
                        <i className='fa fa-trash'></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    
    return (
        <Fragment>
            <MetaData title={'Admin - Sản phẩm'}/>
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar/>
                </div>
            

            <div className='col-12 col-md-10' >
                <Fragment>
                    <h1 className='my-5'>Tất cả sản phẩm</h1>

                    {loading ? <Loader/> : (
                        <MDBDataTableV5 
                            data={setProducts()}
                            className='px-2 list-product'
                            bordered
                            striped
                            hover
                            searchTop
                            searchBottom={false} 
                            entriesLabel="Hiển thị"
                            entries={10}
                            noRecordsFoundLabel="Không có dữ liệu để hiển thị"
                            searchLabel="Tìm kiếm"
                        />
                    )}
                </Fragment>
            </div>
            </div>
        </Fragment>

    )
}

export default ProductList