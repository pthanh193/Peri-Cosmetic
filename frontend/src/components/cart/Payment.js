import React , {Fragment, useEffect} from 'react'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import CheckoutSteps from './CheckoutSteps'
import axios from 'axios'
import {useStripe, useElements, CardNumberElement, CardExpiryElement,CardCvcElement} from '@stripe/react-stripe-js'
import {createOrder, clearErrors} from '../../actions/orderActions'
import { removeItemFromCart } from "../../actions/cartActions";
import CurrencyFormat from 'react-currency-format'
const options = {
    style: {
        base:{
            fontSize: '16px',
        },
        invalid:{
            color: '#9e2146',
        },
    },
};

const Payment = ({history}) => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order))
                    cartItems.map((item) => dispatch(removeItemFromCart(item.product)));

                    history.push('/success')
                } else {
                    alert.error('???? x???y ra l???i trong qu?? tr??nh thanh to??n')
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>
            <MetaData title={'Thanh to??n'} />
            <CheckoutSteps shipping confirmOrder payment/>

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-4 text-center">Th??ng tin th???</h1>
                    <div className="form-group">
                    <label htmlFor="card_num_field">S??? th???</label>
                
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                        options={options}
                        />
                    
                    </div>
                    <div className="py-2">
                        <div className="form-group">
                        <label htmlFor="card_exp_field">Ng??y h???t h???n</label>
                        <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control"
                            options={options}

                        />
                        </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="card_cvc_field">M?? CVC</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        options={options}
                    />
                    </div>
                    <button
                        style={{marginLeft: "90px"}}
                        id="pay_btn"
                        type="submit"
                        className="btn btn-block"
                    >
                    Thanh to??n 
                    (-<CurrencyFormat value={orderInfo.totalPrice} displayType={'text'} thousandSeparator={true}/>??)
                    </button>
        
                </form>
                </div>
            </div>


        </Fragment>
    )
}

export default Payment