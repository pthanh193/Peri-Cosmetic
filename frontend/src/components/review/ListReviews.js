import React, { Fragment,useState, useEffect } from "react"
import Moment from "react-moment"
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert';
import { useDispatch,useSelector } from "react-redux";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { newReview,clearErrors } from "../../actions/productActions";
import { getProductDetails } from '../../actions/productActions'

const ListReviews = ({reviews}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [idReview, setIdReview] = useState('');
    const [productId, setProductId] = useState('');

    const { success } = useSelector(state => state.newReview);

    useEffect(() => {
      if(success) {
        dispatch({ type: NEW_REVIEW_RESET });
        alert.success('Thay đổi đánh giá thành công.')
        dispatch(getProductDetails(productId))
      }
    }, [dispatch, success])

    function setUserRatings (id, review) {
      setComment(review.comment)
        setIdReview(id);
        setProductId(review.product);
        setRating(review.rating)

        const stars = document.querySelectorAll(['.star']);
        stars.forEach((star, ind) => {
          if(ind < review.rating) {
            star.classList.add('orange');
          }
        })

        stars.forEach((star, index) => {
            star.starValue = index +1;            
    
            ['click', 'mouseover', 'mouseout'].forEach(function(e){
                star.addEventListener(e, showRatings);
            })
        })
    
        function showRatings(e){
          stars.forEach((star, index)=> {
            if(e.type ==='click'){
              if(index < this.starValue){
                star.classList.add('orange');
    
                setRating(this.starValue)
              } else {
                star.classList.remove('orange')
              }
            }
    
            if(e.type ==='mouseover'){
              
              if(index < this.starValue){
                star.classList.add('yellow');
              } else {
                star.classList.remove('yellow')
              }
            }
    
            if(e.type ==='mouseout'){
              star.classList.remove('yellow')
              
            }
          })
        }
      }
      
    
      const reviewHandler=(id) => {
        const formData = new FormData();
    
        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', productId);
    
        dispatch(newReview(formData)); 
    
      }
    

    return (
        <Fragment>
            <div class="reviews w-75">
            
            {reviews.map(review =>(
                <div key={review.id} className="review-card ">
                    <p className="review_user" style={{margin:"0"}}>{review.name}</p>
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(review.rating /5) *100}%`}}></div>
                    </div>
                    
                    <p className="review_comment" style={{margin:"0"}}>{review.comment}</p>
                    <p className="review_createdat">
                      <Moment format="DD/MM/YYYY  h:mmA">{review.createAt}</Moment> | <Link to="#" className="card-title" data-toggle="modal" data-target="#ratingModal" onClick={()=> setUserRatings(review._id, review)}>Chỉnh sửa</Link>
                    </p>
                    
                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h5 className="modal-title" id="ratingModalLabel">Đánh giá sản phẩm</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div className="modal-body">

                                <ul className="stars" >
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                </ul>

                                <textarea name="review" id="review" className="form-control mt-3"
                                value={comment}
                                onChange={(e) =>setComment(e.target.value)}>

                                </textarea> 

                                <button className="btn my-3 float-right review-btn px-4 text-body float-end" 
                                data-dismiss="modal" aria-label="Close"
                                onClick={()=> reviewHandler(review._id)}>Đánh giá</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                </div>
            ))  
            
            }
                
        </div>
        </Fragment>
    )
}

export default ListReviews