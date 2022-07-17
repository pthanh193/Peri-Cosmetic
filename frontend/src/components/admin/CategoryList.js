import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import swal from "sweetalert"
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    deleteCategory,
  clearErrors,
} from "../../actions/categoryActions";
import { getAdminProducts } from "../../actions/productActions";
import { DELETE_CATEGORY_REQUEST } from "../../constants/categoryConstants";

const CategoryList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      //alert.success("Loại sản phẩm đã được xóa");
      history.push("/admin/categories");
      dispatch({ type: DELETE_CATEGORY_REQUEST });
    }
  }, [history, dispatch, alert, error, deleteError, isDeleted]);

  const setCategory = () => {
    const data = {
      columns: [
        {
          label: "Mã loại sản phẩm",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên loại sản phẩm",
          field: "name",
          sort: "asc",
        },
        {
          label: "Số sản phẩm thuộc loại sản phẩm",
          field: "quantity",
        },
        {
          label: "",
          field: "actions",
        },
      ],
      rows: [],
    };

    categories &&
      categories.forEach((cate) => {
        let result = 0;
        products.forEach((pro) => pro.category == cate._id && (result = result + 1));

        data.rows.push({
          id: cate._id,
          name: cate.name,
          quantity: `${result}`,
          actions: (
            <Fragment>
              <Link
                to={`/admin/category/${cate._id}`}
                className=" py-1 btn btn-primary"  
              >
                <i className="fa fa-edit"></i>
              </Link>
              <button
                className="btn btn-danger py-1 ml-2"
                onClick={() => deleteCateHandler(cate._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  const deleteCateHandler = (id) => {
    swal({
      title: "Bạn có chắc chắn không?",
      text: "Các thông tin sau khi xóa sẽ không thể khôi phục được nữa!",
      icon: "warning",
      buttons: ["Hủy", "Xóa"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
        swal("Xóa loại sản phẩm thành công.", {
          icon: "success",
        });
      } else {
        swal("Loại sản phẩm chưa được xóa.");
      }
    });
  };

  return (
    <Fragment>
      <MetaData title={"Tất cả loại sản phẩm"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h2
              className="mt-5 ml-2"
            >
              Tất cả loại sản phẩm
            </h2>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTableV5
                data={setCategory()}
                className="px-3"
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
  );
};

export default CategoryList;
