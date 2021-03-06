import './App.scss';

import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

//Admin Control Panel
import ControlPanel from './components/admin-controls/ControlPanel';

//About Website
import TermsAndConditions from './components/about-website/TermsAndConditions';
import PrivacyPolicy from './components/about-website/PrivacyPolicy';
import Cookie from './components/about-website/Cookie';
import About from './components/about-website/About';
import Donation from './components/about-website/Donation.js';
import Suggestion from './components/about-website/Suggestion.js';
import Contact from './components/about-website/Contact.js';

//Login-Signup
import SignupSeller from './components/login-signup/SignupSeller';
import SignupBuyer from './components/login-signup/SignupBuyer';
import Login from './components/login-signup/Login';
import ForgotPassword from './components/login-signup/ForgotPassword';
import ResetPassword from './components/login-signup/ResetPassword';

//Layout
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Footer from './components/layout/Footer';

//GuestRoutes for all users
import MainProduct from './components/guestRoutes/one-product/MainProduct'
import UserProducts from './components/guestRoutes/user-products/UserProducts';
import Home from './components/guestRoutes/home/Home';

//AuthRoutes for logged in users
//profile
import Me from './components/authRoutes/me/Me';
import MyFavourite from './components/authRoutes/profile/MyFavourite';
import MyFollowing from './components/authRoutes/following/MyFollowing.js';
import MyFollowingLatest from './components/authRoutes/following/MyFollowingLatest.js';
import MyReview from './components/authRoutes/profile/MyReview';

//create:edit
import MyProduct from './components/authRoutes/profile/MyProduct'
import Edit from './components/authRoutes/edit-product/Edit';
import CreateProduct from './components/authRoutes/edit-product/CreateProduct';

//orders
import BuyerTickets from './components/authRoutes/tickets/ticket-status/BuyerTickets';
import SellerTickets from './components/authRoutes/tickets/ticket-status/SellerTickets';
import TicketHistory from './components/authRoutes/tickets/ticket-history/TicketHistory';
import TicketBin from './components/authRoutes/tickets/ticket-bin/TicketBin';
import TicketBinBuyer from './components/authRoutes/tickets/ticket-bin/TicketBinBuyer';
import TicketBinSeller from './components/authRoutes/tickets/ticket-bin/TicketBinSeller';

//routing
import PrivateRoute from './routings/private-routes/PrivateRoute';
import PrivateRouteAdmin from './routings/private-routes/PrivateRouteAdmin';
import LoadData from './routings/LoadData';
import NotFound from './routings/NotFound';
import Connection from './routings/Connection';
import AcceptCookie from './routings/AcceptCookie';
import Title from './routings/Title';

//----------------------CATEGORY
import SearchBar from './components/guestRoutes/category-search/SearchBar';
import Category from './components/guestRoutes/category-search/Category';
import SearchEnter from './components/guestRoutes/category-search/SearchEnter';
import StatsProduct from './components/guestRoutes/category-search/StatsProduct';
import StatsSupplier from './components/guestRoutes/category-search/StatsSupplier';
//-----------------------End of Category

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser(document.cookie))
  })

return (
  <Provider store={store}>
    <Router>
      <div className="main-body">

        <Title />
        <AcceptCookie />
        <Connection />
        <Alert />
        <Navbar />
        <LoadData />

        <Switch>
          <Route exact path='/'                component={Home}               />
          <Route path='/product/:id'           component={MainProduct}        />
          <Route path='/shop/:id'              component={UserProducts}       />
          <Route exact path='/signup seller'   component={SignupSeller}       />
          <Route exact path='/signup buyer'    component={SignupBuyer}        />
          <Route exact path='/login'           component={Login}              />
          <Route path='/resetpassword'         component={ResetPassword}      />
          <Route exact path='/forgot password' component={ForgotPassword}     />

          <Route path='/terms'                 component={TermsAndConditions} />
          <Route path='/privacy'               component={PrivacyPolicy}      />
          <Route path='/cookie'                component={Cookie}             />
          <Route path='/about'                 component={About}              />
          <Route path='/donation'              component={Donation}           />
          <Route path='/contact'               component={Contact}            />
          <PrivateRoute path='/suggestion'     component={Suggestion}         />

          <Route path='/category'              component={Category}           />
          <Route path='/search'                component={SearchBar}          />
          <Route path='/enter'                 component={SearchEnter}        />
          <Route path='/products'              component={StatsProduct}       />
          <Route path='/suppliers'             component={StatsSupplier}      />

          <PrivateRoute exact path='/me'              component={Me}                />
          <PrivateRoute exact path='/create'          component={CreateProduct}     />
          <PrivateRoute exact path='/my product'      component={MyProduct}         />
          <PrivateRoute exact path='/edit/:id'        component={Edit}              />
          <PrivateRoute exact path='/favourite'       component={MyFavourite}       />
          <PrivateRoute exact path='/my review'       component={MyReview}          />
          <PrivateRoute exact path='/following'       component={MyFollowing}       />
          <PrivateRoute exact path='/latest'          component={MyFollowingLatest} />
          <PrivateRoute exact path='/ticket/buyer'    component={BuyerTickets}      />
          <PrivateRoute exact path='/ticket/seller'   component={SellerTickets}     />
          <PrivateRoute exact path='/ticket/history'  component={TicketHistory}     />
          <PrivateRoute exact path='/ticket/bin'      component={TicketBin}         />
          <PrivateRoute exact path='/buyerbin'        component={TicketBinBuyer}    />
          <PrivateRoute exact path='/sellerbin'       component={TicketBinSeller}   />

          <PrivateRouteAdmin exact path='/control-panel' component={ControlPanel}   />

          <Route component={NotFound}/>
        </Switch>
      </div>

      <Footer/>

    </Router>
  </Provider>
  )
};

export default App
