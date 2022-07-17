import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import swal from "sweetalert"
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {getBrands, deleteBrand, clearErrors,} from "../../actions/brandActions";
import { getAdminProducts } from "../../actions/productActions";
import { DELETE_BRAND_RESET } from "../../constants/brandConstants";

const BrandsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, brands } = useSelector((state) => state.brands);
  const { products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
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
      //alert.success("Thương hiệu đã được xóa");
      history.push("/admin/brands");
      dispatch({ type: DELETE_BRAND_RESET });
    }
  }, [history, dispatch, alert, error, deleteError, isDeleted]);

  const setBrandss = () => {
    const data = {
      columns: [
        {
          label: "Mã thương hiệu",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên thương hiệu",
          field: "name",
          sort: "asc",
        },
        {
          label: "Xuất xứ",
          field: "origin",
          sort: "asc",
        },
        {
          label: "Số sản phẩm thuộc thương hiệu",
          field: "quantity",
        },
        {
          label: "",
          field: "actions",
        },
      ],
      rows: [],
    };

    brands &&
      brands.forEach((br) => {
        let result = 0;
        products.forEach((pro) => pro.brand == br._id && (result = result + 1));

        data.rows.push({
          id: br._id,
          name: br.name,
          origin: br.origin,
          quantity: `${result}`,
          actions: (
            <Fragment>
              <Link
                to={`/admin/brand/${br._id}`}
                className=" py-1 btn btn-primary" style={{paddingRight: "8px"}}
              >
                <i className="fa fa-edit"></i>
              </Link>
              <button
                className="btn btn-danger py-1 ml-2"
                onClick={() => deleteBrandHandler(br._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  const deleteBrandHandler = (id) => {

    swal({
      title: "Bạn có chắc chắn không?",
      text: "Các thông tin sau khi xóa sẽ không thể khôi phục được nữa!",
      icon: "warning",
      buttons: ["Hủy", "Xóa"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBrand(id));
        swal("Xóa thương hiệu thành công.", {
          icon: "success",
        });
      } else {
        swal("Thương hiệu chưa được xóa.");
      }
    });
  };

  return (
    <Fragment>
      <MetaData title={"Admin - Thương hiệu"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h2
              className="mt-5 ml-2"
            >
              Tất cả thương hiệu
            </h2>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTableV5
                data={setBrandss()}
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

export default BrandsList;
