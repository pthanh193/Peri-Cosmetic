import React, {Fragment, useState} from 'react'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import {saveShippingInfo} from '../../actions/cartActions'
import CheckoutSteps from './CheckoutSteps'
import data from "../../data.json";

const Shipping = ({history}) => {

    const {shippingInfo} = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity]= useState(shippingInfo.city)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [huyen, setHuyen] = useState(shippingInfo.huyen);
    const [xa, setXa] = useState(shippingInfo.xa);
    const [method, setMethod] = useState(shippingInfo.method);
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        console.log('data method', method)
        dispatch(saveShippingInfo({address, city, phoneNo, huyen, xa, method}))
        history.push('/orders/confirm')
    }
    return (
        <Fragment>
            <MetaData title={'Shipping Info'}/>
            <CheckoutSteps shipping/>
            <div className="row wrapper mt-2">
                <div className="col-10 col-lg-6">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4 text-center">Thông tin nhận hàng</h1>

                        
                        <div className="form-group" style={{width: "400px", marginLeft: "30px"}}>
                            <label htmlFor="phone_field">Số điện thoại</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e)=> setPhoneNo(e.target.value)}
                                required
                            />
                        
                        </div>

                        <div className="py-2">
                        <div className="form-group" style={{width: "400px", marginLeft: "30px"}}>
                            <label htmlFor="address_field">Địa chỉ</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e)=> setAddress(e.target.value)}
                                required
                            />
                        </div>
                        </div>
                        
                        <div className="form-group" style={{width: "400px", marginLeft: "30px"}}>
                            <label htmlFor="city_field">Tỉnh/Thành phố</label>
                            <select
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e)=> setCity(e.target.value)}
                                required
                            >

                                <option hidden>Vui lòng chọn thành phố/tỉnh...</option>
                                {data.map((tp) => (
                                <option key={tp.Id} value={tp.Name}>
                                    {tp.Name}
                                </option>
                                ))}
                            </select>
                        </div>
                       

                        <div className="py-2">
                        <div className="form-group" style={{width: "400px", marginLeft: "30px"}}>
                            <label htmlFor="postal_code_field">Quận/Huyện</label>
                            <select
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={huyen}
                                onChange={(e)=> setHuyen(e.target.value)}
                                required
                            >
                             <option hidden>Vui lòng chọn quận/huyện...</option>
                                {data &&
                                data.map(
                                    (tp) =>
                                    tp.Name === city &&
                                    tp.Districts.map((h) => (
                                        <option key={h.Id} value={h.Name}>
                                        {h.Name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        </div>

                      
                        <div className="form-group" style={{width: "400px", marginLeft: "30px"}}>
                            <label htmlFor="country_field">Phường/Xã</label>
                            <select
                                type="text"
                                id="country_field"
                                className="form-control"
                                value={xa}
                                onChange={(e)=> setXa(e.target.value)}
                                required
                            >    

                             <option hidden>Vui lòng chọn xã/phường...</option>
                                {data &&
                                data.map(
                                    (tp) =>
                                    tp.Name === city &&
                                    tp.Districts.map(
                                        (h) =>
                                        h.Name === huyen &&
                                        h.Wards.map((x) => (
                                            <option key={x.Id} value={x.Name}>
                                            {x.Name}
                                            </option>
                                        ))
                                    )
                                )}
                            </select>                        
                        
                        </div>

                        <div className="py-2">
                        <div className="form-group" style={{width: "400px", marginLeft: "30px"}}>
                            <label htmlFor="country_field">Phương thức thanh toán</label>
                            <select
                            id="country_field"
                            className="form-control"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            required
                            >
                            <option hidden>Vui lòng chọn phương thức thanh toán</option>
                            <option value="Thanh toán khi nhận hàng">
                                Thanh toán khi nhận hàng
                            </option>
                            <option value="Thanh toán qua thẻ">Thanh toán qua thẻ</option>
                            </select>
                        </div>
                        </div>


                        <button
                            style={{marginLeft: "180px"}}
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block"
                        >
                            Tiếp tục
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping