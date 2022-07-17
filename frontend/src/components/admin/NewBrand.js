import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { newBrand, clearErrors } from "../../actions/brandActions";
import { NEW_BRAND_RESET } from "../../constants/brandConstants";

const NewBrand = ({ history }) => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [image, setImage] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(state => state.newBrand);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/brands");
      alert.success("Tạo thương hiệu thành công");
      dispatch({ type: NEW_BRAND_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("origin", origin);
    image.forEach(image => {
      formData.append('image', image)
  })

    dispatch(newBrand(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImage([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImage((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Thương hiệu mới"} />
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
                  Thêm mới thương hiệu
                </h2>

                {/* Tên thuong hieu ---------------------------------------------------*/}
                <div className="form-group">
                  <label htmlFor="name_field">Tên thương hiệu</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="py-2">
                  <div className="form-group">
                    <label htmlFor="name_field">Xuất xứ</label>
                    <input
                      type="text"
                      id="origin_field"
                      className="form-control"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label>Hình ảnh</label>

                  <div className='custom-file'>
                      <input
                          type='file'
                          name='nrand_images'
                          className='form-control'
                          id='formFile'
                          onChange={onChange}
                          multiple
                      />
                      
                  </div>

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
                  Thêm thương hiệu
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewBrand;
