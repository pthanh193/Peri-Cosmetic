const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    shippingInfo:{

        phoneNo:{
            type: String,
            required: true  
        },
        city: { 
            type: String, 
            required: false },
        huyen: {
             type: String, 
             required: false },
        xa: { 
            type: String, 
            required: false },
        address: { 
            type: String, 
            required: false },
        method: {
        type: String,
        required: [true, "Vui lòng chọn phương thức thanh toán"],
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref:'User'
    },
    orderItems:[
        {
            name:{
                type: String,
                required: true
            },
            quantity:{
                type:Number,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            price:{
                type:Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true, 
                ref:'Product'
            }
        }
    ],
    paymentInfo:{
        id:{
            type: String
        }, 
        status: {
            type: String
        }
    },
    paidAt:{
        type: Date
    },
    itemsPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus:{
        type: String,
        required: true,
        default: 'Đang xử lý'
    },
    deliveredAt:{
        type: Date
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)