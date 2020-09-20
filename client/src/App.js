/*

Login / Logout complete
Need to save user information

*/

import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Index from './components/homepage/Index';
import Users from './components/users/Users';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    console.log('Say hey')
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/users' component={Users} />
          <Route exact path ='/login' component={Login} />
          <Route exact path ='/signup' component={Signup} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
