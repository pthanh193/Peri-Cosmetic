import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-bootstrap/Carousel'
import Loader from '../layouts/Loader'
import {addItemToCart} from '../../actions/cartActions'
import {getProductDetails, newReview,getAdminProducts, clearErrors, updateReview} from '../../actions/productActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import ListReviews from '../review/ListReviews'
import CurrencyFormat from 'react-currency-format'
import { getBrands } from '../../actions/brandActions'
import { getCategories } from '../../actions/categoryActions'
import { Tab, Tabs,  } from 'react-bootstrap';
import Product from './Product'


const ProductDetails = ({match }) => {

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product } = useSelector(state => state.productDetails)
  const { user} = useSelector(state => state.auth)
  const {error: reviewError, success} = useSelector(state => state.newReview)
  const {brands} = useSelector(state => state.brands);
  const {categories} = useSelector(state => state.categories);
  const { products } = useSelector((state) => state.products);

 

  useEffect(() => {
    document.body.scrollTo(0,0);
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getProductDetails(match.params.id));
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors())
    }

  }, [dispatch, alert,  error,reviewError, match.params.id])

  let proRecommends = [];

  products && products.forEach((pro) =>
    pro._id !== product._id && pro.category === product.category && proRecommends.push(pro)
  );

  const addToCart = ()=>{
    dispatch(addItemToCart(match.params.id,quantity));
    alert.success('S???n ph???m ???? ???????c th??m v??o gi??? h??ng')
  }

  const increaseQty = () => {
    const count = document.querySelector('.count')

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count')

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }

  function setUserRatings() {
    
    const stars = document.querySelectorAll('.star');
    
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

  // const reviewHandler = (id) => {
  //   const formData = new FormData();

  //   formData.set('rating', rating);
  //   formData.set('comment', comment);
  //   formData.set('productId', match.params.id);

  //   dispatch(updateReview(id,formData));


  // }

  const [key, setKey] = useState('home');

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={product.name} />
         
          <div className="row">
           
            <img className="d-block detail-img mt-5" src={product.images && product.images[0].url} alt={product.title} />
          

            <div className="col-md-6 mt-5">
              <h2>{product.name}</h2>
              <div className="rating-outer">
                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
              </div>
              <span id="no_of_reviews">{product.numOfReviews > 0 ? 
              <span>({product.numOfReviews} ????nh gi??)</span> : "Ch??a c?? ????nh gi??"}</span>

              <hr />

              <p id="product_price" style={{color: "#6868ac"}}> 
              <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true}/>??
              </p>
              <hr />

              
              <p><span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 
              ?  
              <div className="stockCounter d-inline ">
                <p style={{color:"grey"}} >S??? l?????ng:  <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                <input type="number" className="form-control count d-inline" value={quantity} readOnly style={{marginRight: "-15px"}} />

                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>

                <span id="product_id">   {product.stock} s???n ph???m</span>
                </p>
                <button type="button" id="cart_btn" disabled={product.stock === 0} 
                onClick={addToCart} className="btn btn-primary d-inline ml-4">
                <i class="fas fa-cart-plus"></i>  Th??m v??o gi??? h??ng 
                </button>
              </div>
              : 'H???t h??ng'}</span></p>


            

          </div>
          
            <Tabs id="controlled-tab-example"  activeKey={key}
              onSelect={(k) => setKey(k)}  className="mb-3"
            >
              <Tab eventKey="home" title="Th??ng tin s???n ph???m">
                <div className="card shadow">
                  <div className="row no-gutters mt-3" style={{paddingLeft: "15px",paddingRight: "15px"}}>                     
                    <div>
                      <div className="title-desc-product">
                        <span className="sub-title">M?? T??? S???N PH???M:</span>
                      </div>
                      <div className="desc-product">{product.description}</div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <img
                        src={product.images && product.images[0].url}
                        alt=""
                        className="img-detail-product"
                      />
                    </div>

                    <div>
                      <div className="title-desc-product">
                        <span className="sub-title">C??NG D???NG:</span>
                      </div>
                      <div className="desc-product">{product.uses}</div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <img
                        src={product.images && product.images[1].url}
                        alt=""
                        className="img-detail-product"
                      />
                    </div>

                    <div>
                      <div className="title-desc-product">
                        <span className="sub-title">TH??NH PH???N:</span>
                      </div>
                      <div className="desc-product">{product.ingredient}</div>
                    </div>

                    <div style={{ width: "100%" }}>
                      <img
                        src={product.images && product.images[2].url}
                        alt=""
                        className="img-detail-product"
                      />
                    </div>

                    <div>
                      <div className="title-desc-product">
                        <span className="sub-title">H?????NG D???N S??? D???NG:</span>
                      </div>
                      <div className="desc-product">{product.use}</div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile" title="????nh gi??">
                {product.reviews && product.reviews.length > 0 ? (
                  <ListReviews reviews={product.reviews}/>
                ): <p>Ch??a c?? ????nh gi??</p>}  
              </Tab>            
            </Tabs>
            <hr/>
            {proRecommends.length !== '0' && (
            <div >
              <div className="sub-title" style={{marginTop:'35px'}} >
                <h4>S???n ph???m li??n quan</h4>
              </div>
              <div className="row">
                {proRecommends.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))}
              </div>
              </div>            
          )}
           
          </div>

          
          
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails; 