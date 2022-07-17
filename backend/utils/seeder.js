const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand')
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');


const products = require('../data/products'); 
const categories = require('../data/category'); 
const brands = require('../data/brand.json')

const { connect } = require('mongoose');

//Setting dotenv file
dotenv.config({ path: 'backend/config/config.env'})

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All products are added');

        // await Category.deleteMany();
        // console.log('Categories are deleted');

        // await Category.insertMany(categories)
        // console.log('All categories are added');

        // await Brand.deleteMany();
        // console.log("Brand are deleted");

        // await Brand.insertMany(brands);
        // console.log("All Brand are added");

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }

}

seedProducts()