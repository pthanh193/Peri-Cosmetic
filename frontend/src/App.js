import { BrowserRouter as Router, Route} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import store from './store'
import './App.css';

// Components
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'

// User
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import ProtectedRoute from './components/route/ProtectedRoute';
import Profile from './components/user/Profile';

// Cart
import ProductDetails from './components/product/ProductDetails'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

// Order
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

// Auth
import Login from './components/user/Login'
import Register from './components/user/Register'
import {loadUser} from './actions/userActions'

// Payment
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

//Brand
import AllBrands from "./components/product/AllBrands";
import SingleBrand from './components/product/SingleBrand'

//Category
import SingleCategory from './components/product/SingleCategory'

//Review
import ListReviews from './components/review/ListReviews'

//Product
import AllProducts from './components/product/AllProducts'

//Admin
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList'; 
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import BrandsList from './components/admin/BrandsList';
import NewBrand from './components/admin/NewBrand';
import UpdateBrand from './components/admin/UpdateBrand'
import NewCategory from './components/admin/NewCategory'
import UpdateCategory from './components/admin/UpdateCategory'
import CategoryList from './components/admin/CategoryList'
import OrderList from './components/admin/OrderList'
import ProcessOrder from './components/admin/ProcessOrder'
import UserList from './components/admin/UserList'
import ReviewList from './components/admin/ReviewList'
import AlertPassword from './components/user/AlertPassword'



function App() {
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(()=>{
    store.dispatch(loadUser())

    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <Header/>
          <div className="container container-fluid">
            <Route  path="/" component={Home } exact/>
            <Route  path="/search/:keyword" component={Home} />
            <Route  path="/product/:id" component={ProductDetails } exact/>

            <Route path="/allBrands" component={AllBrands} exact />
            <Route path="/brands/:id" component={SingleBrand} exact />
            <Route path="/category/:id" component={SingleCategory} exact/>

            <Route path="/allProducts" component={AllProducts} exact />
            <Route path="/cart" component={Cart} exact/>
            <ProtectedRoute path="/shipping" component={Shipping}/>
            <ProtectedRoute path="/orders/confirm" component={ConfirmOrder}/>
            <ProtectedRoute path="/success" component={OrderSuccess}/>
            {stripeApiKey &&
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute path="/payment" component={Payment}/>
              </Elements>

            }

            <Route  path="/login" component={Login}/>
            <Route  path="/register" component={Register}/>
            <Route path="/password/forgot" component={ForgotPassword} exact/>
            <Route path="/password/forgot/success" component={AlertPassword} exact/>
            <Route path="/password/reset/:token" component={NewPassword} exact/>
            
            <ProtectedRoute  path="/me" component={Profile } exact/>
            <ProtectedRoute  path="/me/update" component={UpdateProfile } exact/>
            <ProtectedRoute  path="/password/update" component={UpdatePassword } exact/>

            <ProtectedRoute  path="/orders/me" component={ListOrders} exact/>
            <ProtectedRoute  path="/order/:id"  component={OrderDetails} exact/>
            </div>


            
            <ProtectedRoute  path="/dashboard" isAdmin={true} component={Dashboard} exact/>
            <ProtectedRoute  path="/admin/products" isAdmin={true} component={ProductList} exact/>
            <ProtectedRoute  path="/admin/products/new" isAdmin={true} component={NewProduct} exact/>
            <ProtectedRoute  path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact/>

            <ProtectedRoute  path="/admin/brands" isAdmin={true} component={BrandsList} exact/>
            <ProtectedRoute  path="/admin/brands/new" isAdmin={true} component={NewBrand} exact/>
            <ProtectedRoute  path="/admin/brand/:id" isAdmin={true} component={UpdateBrand} exact/>
            
            <ProtectedRoute  path="/admin/categories" isAdmin={true} component={CategoryList} exact/>
            <ProtectedRoute  path="/admin/categories/new" isAdmin={true} component={NewCategory} exact/>
            <ProtectedRoute  path="/admin/category/:id" isAdmin={true} component={UpdateCategory} exact/>

            <ProtectedRoute  path="/admin/orders" isAdmin={true} component={OrderList} exact/>
            <ProtectedRoute  path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact/>

            <ProtectedRoute  path="/admin/users" isAdmin={true} component={UserList} exact/>
            <ProtectedRoute  path="/admin/reviews" isAdmin={true} component={ReviewList} exact/>



        <Footer/>
      </div>
    </Router>
  );
}


export default App;
