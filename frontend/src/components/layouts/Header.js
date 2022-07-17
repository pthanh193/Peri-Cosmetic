import React, {Fragment} from 'react'
import '../../App.css'
import Search from './Search'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { useEffect } from 'react'
import {logout} from '../../actions/userActions'
import { getCategories } from '../../actions/categoryActions'

const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {user, loading} = useSelector(state => state.auth)
    const {cartItems} = useSelector(state => state.cart)
    const {categories} = useSelector(state => state.categories)

    // useEffect(()=>{
    //     dispatch(getCategories());
    // })

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Đăng xuất thành công.')
    }

    return (
        <Fragment>
             <nav className="navbar navbar-expand-md  navbar-dark" style={{paddingTop:"0px", paddingBottom: "0px"}}>
                <div className="navbar-brand"></div>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" style={{height: "40px"}} id="navbarCollapse">
                    <div className="navbar-nav" style={{marginLeft: "80px"}}>
                        <Link to="/allBrands"  className="nav-item nav-link ">Thương hiệu</Link>
                        <Link to="/allProducts"  className="nav-item nav-link ">Sản phẩm</Link>
                        
                        {/* <div class="nav-item dropdown">
                            <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Danh mục sản phẩm</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {categories &&
                                categories.map((cate) => (
                                    <Link to={`/category/${cate._id}`} className="dropdown-item">
                                    <option key={cate} value={cate._id}>
                                    {cate.name}
                                    </option>
                                    </Link>
                                ))}
                                
                            </div>
                        </div> */}
                        <div className="nav-item dropdown" >
                            <Link to="#" class="nav-link dropdown-toggle" >
                                Danh mục sản phẩm
                            </Link>


                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                {categories && categories.map((cate) => (
                                    <li>
                                    <Link to={`/category/${cate._id}`} className="dropdown-item">
                                    <option key={cate} value={cate._id}>
                                    {cate.name}
                                    </option>
                                    </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    
                    </div>
                    {user ? ( 
                        
                        <div className="nav-item dropdown justify-content-between" style={{width: "220px"}} >
                            
                            
                            <Link to="#" class="nav-link dropdown-toggle text-white" 
                                  role="button" data-bs-toggle="dropdown" aria-expanded="false">                                
                                
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                        
                                </figure>
                            
                                {user && user.name}
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">

                                <li>
                                    <Link className="dropdown-item" to="/me">Tài khoản của tôi</Link>
                                </li>

                                <li>
                                    {user && user.role === 'admin' ? (
                                        <Link className="dropdown-item" to="/dashboard">Trang quản lý</Link>
                                    ): (
                                        <Link className="dropdown-item" to="/orders/me">Đơn mua</Link>

                                    )}
                                </li>                             
                                
                                <li>
                                <Link className="dropdown-item text-danger" to ="/" onClick={logoutHandler}>
                                    Đăng xuất
                                </Link> 
                                </li>
                            </ul>
                            
                        </div>
                        ) : !loading && (
                            <div className="navbar-nav" style={{width: "220px"}} >
                                <Link to="/register" style={{color: "white"}} className="nav-item nav-link" >Đăng ký</Link> 
                                <Link to="/login" style={{color: "white"}} className="nav-item nav-link" >Đăng nhập</Link> 
                            </div>
                        )
                        
                    }
                </div>
            </nav>

            <div className=" row" style={{backgroundColor: "#6868ac", height: "80px"}}> 
                <div className="col-12 col-md-3">
                    <a href="/">
                    <img alt="logo" width="150px" height="80px" src="https://res.cloudinary.com/thanhscloud/image/upload/v1647316280/logo/logo_kcjire.png" /> 
                    </a>
                </div>

                <div className="col-12 col-md-7 mt-2 mt-md-0 "  >
                    <Route render={( {history} ) => <Search history={history} />}/>
                </div>

                <div className="col-12 col-md-2 mt-4 mt-md-0" >
                    <Link to='/cart' style={{ textDecoration: 'none'}}>
                        <div style={{marginTop: "20px", marginLeft: "15px"}}>
                            
                            <span className="ml-1 py-2" id="cart_count"><i class="fas fa-shopping-cart"></i>({cartItems.length})</span>
                        </div>
                    </Link>               

                   
                </div>
            </div>             
        </Fragment>
    )
}

export default Header