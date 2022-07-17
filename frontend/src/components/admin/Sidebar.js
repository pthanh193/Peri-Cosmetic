import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const Sidebar = () => {
    return (
        <Fragment>
             <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer-alt"></i> Tổng quan</Link>
                    </li>

                    <li>
                        <a href="#brandSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-tag"></i> Thương hiệu</a>
                        <ul className="collapse list-unstyled" id="brandSubmenu">
                            <li>
                            <Link to="/admin/brands"><i className="fa fa-clipboard-list"></i> Tất cả thương hiệu</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/brands/new"><i className="fa fa-plus"></i> Thêm thương hiệu</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#categorySubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-list"></i> Loại sản phẩm</a>
                        <ul className="collapse list-unstyled" id="categorySubmenu">
                            <li>
                            <Link to="/admin/categories"><i className="fa fa-clipboard-list"></i> Tất cả loại sản phẩm</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/categories/new"><i className="fa fa-plus"></i> Thêm loại sản phẩm</Link>
                            </li>
                        </ul>
                    </li>
            
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-archive"></i> Sản phẩm</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/products"><i className="fa fa-clipboard-list"></i> Tất cả sản phẩm</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/products/new"><i className="fa fa-plus"></i> Thêm sản phẩm</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Đơn hàng</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Thành viên</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Đánh giá</Link>
                    </li>
            
                </ul>
                </nav>
            </div>
        </Fragment>
    )
}

export default Sidebar