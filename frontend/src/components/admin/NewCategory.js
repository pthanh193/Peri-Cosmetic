import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NEW_CATEGORY_RESET } from '../../constants/categoryConstants'
import { newCategory, clearErrors } from '../../actions/categoryActions'

const NewCategory = ({ history }) => {
  const [name, setName] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(state => state.newCategory);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/categories");
      alert.success("Thêm loại sản phẩm mới thành công");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);

    dispatch(newCategory(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Loại sản phẩm mới"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
                style={{ width: 800 }}
              >
                <h2
                  className="mb-4 text-center"
                >
                  Thêm loại sản phẩm mới
                </h2>

                {/* Tên thuong hieu ---------------------------------------------------*/}
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
                  Thêm loại sản phẩm
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewCategory;
