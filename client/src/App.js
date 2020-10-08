/*

PrivateRoute is not working again
Detects isAuthenticated
    Redirects to --> Login
    Redirects to --> Homepage

*/
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import MyContainer from './components/layout/MyContainer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';

import Index from './components/homepage/Index';
import Users from './components/users/Users';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Private from './components/private/Private';
import Profile from './components/profile/Profile';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <MyContainer>
        <div className="content">
          <Header />
            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/users' component={Users} />
              <Route exact path ='/login' component={Login} />
              <Route exact path ='/signup' component={Signup} />
              <PrivateRoute exact path='/private' component={Private} />
              <PrivateRoute exact path='/profile' component={Profile} />
            </Switch>
        </div>
        <Footer />
      </MyContainer>
    </Router>
  );
}

export default App;
