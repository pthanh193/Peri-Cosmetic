import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateBrand,  getBrandDetails,  clearErrors,} from "../../actions/brandActions";
import { UPDATE_BRAND_RESET } from "../../constants/brandConstants";

const UpdateBrand = ({ match, history }) => {

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("[]");
  const [imagePreview, setImagePreview] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, brand } = useSelector((state) => state.brandDetails);
  const {loading, error: updateError, isUpdated, } = useSelector((state) => state.brand);

  const brandId = match.params.id;

  useEffect(() => {
    if (brand && brand._id !== brandId) {
      dispatch(getBrandDetails(brandId));
    } else {
      setName(brand.name);
      setOrigin(brand.origin);
      setOldImage(brand.image);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history.push("/admin/brands");
      alert.success("Thay đổi thông tin thương hiệu thành công.");
      dispatch({ type: UPDATE_BRAND_RESET });
    }
  }, [dispatch, alert, error, updateError, isUpdated, history, brand, brandId]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("origin", origin);
    formData.append("image", image);

    dispatch(updateBrand(brand._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagePreview([]);
    setImage([]);
    setOldImage([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((oldArray) => [...oldArray, reader.result]);
          setImage((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Cập nhật thương hiệu"} />
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
                <h2 className="mb-4" >
                  Thay đổi thông tin thương hiệu
                </h2>

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
                    <label htmlFor="origin_field">Xuất xứ</label>
                    <input
                        type="text"
                        id="origin_field"
                        className="form-control"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                    </div>
                </div>

                {/* Hình ảnh------------------------------------------------------------------------------------ */}
                <div className="form-group">
                  <label>Hình ảnh </label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="form-control"
                      id="formFile"
                      onChange={onChange}
                      multiple
                    />
                  </div>

                  {oldImage && (
                    <img key={oldImage} src={oldImage.url} alt={oldImage.url} className="mt-3 mr-2" width="55" heigth="52"/>
                  )}

                  {imagePreview && (
                    <img src={imagePreview} key={imagePreview} alt="Images Preview" className="mt-3 mr-5" width="55" heigth="52"/>
                  )}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block float-end"
                  disabled={loading ? true : false}
                >
                  Cập nhật
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateBrand;
