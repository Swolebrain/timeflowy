import React from 'react';
import {Route, IndexRedirect} from 'react-router-dom';
import AuthService from '../auth/AuthService';
import MainContainer from './MainContainer';
import {Home} from './Home';
import {Login} from './Login';

const auth = new AuthService('84N6au0Il1G8eN7irnCyyqcpXkRkMuvH', 'swolebrain.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const makeRoutes = () => {
  return (
    <Route path="/" component={MainContainer} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} />
    </Route>
  )
}

export default makeRoutes
