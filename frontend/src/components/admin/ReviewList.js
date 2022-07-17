import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import swal from "sweetalert"
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview,getAllReviews, clearErrors } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

const ReviewList = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, reviews } = useSelector(state => state.allReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review);
    console.log('reviewwww', reviews)

    useEffect(() => {

        dispatch(getAllReviews());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            history.push("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, alert, history, error, isDeleted, deleteError])

    const deleteReviewHandler = (id, idProd) => {
        swal({
            title: "Bạn có chắc chắn không?",
            text: "Các thông tin sau khi xóa sẽ không thể khôi phục được nữa!",
            icon: "warning",
            buttons: ["Hủy", "Xóa"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch(deleteReview(id, idProd));
              swal("Xóa đánh giá thành công.", {
                icon: "success",
              });
            } else {
              swal("Đánh giá chưa được xóa.");
            }
          });

    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                  label: "Tên sản phẩm",
                  field: "nameProduct",
                },
                {
                  label: "Tên khách hàng",
                  field: "user",
                },
                {
                  label: "Nội dung đánh giá",
                  field: "comment",
                },
                {
                  label: "Số sao",
                  field: "rating",
                },
                {
                  label: "",
                  field: "actions",
                },
              ],
            rows: []
        }

        reviews && reviews.forEach(review => {
            data.rows.push({
                nameProduct: review.product && review.product.name,
                //id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id,review.product && review.product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Admin - Tất cả đánh giá'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h2  className="mt-5 ml-2" >Tất cả đánh giá </h2>

                        {loading ? (
                            <Loader />
                            ) : (
                            <div className="table-reviews">
                                <MDBDataTableV5
                                data={setReviews()}
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
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ReviewList