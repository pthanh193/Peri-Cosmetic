const express = require('express');
const app = express();

const cors = require('cors')

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')

const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/errors')

//Setting up config file
dotenv.config({path: 'backend/config/config.env'})

 
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(fileUpload());


//Import all routes
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');
const brand = require('./routes/brand');
const product = require('./routes/product');
const category = require ('./routes/category');


app.use('/api/v1', brand);
app.use('/api/v1', product );
app.use('/api/v1', category );
app.use('/api/v1', auth);
app.use('/api/v1', order );
app.use('/api/v1', payment );





//Middleware to handle errors 
app.use(errorMiddleware);
app.use(cors());
module.exports = app