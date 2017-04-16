import React from 'react';
import PropTypes from 'prop-types';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import AuthService from './auth/AuthService';
import {Home} from './routes/Home';
import {Login} from './routes/Login';
const auth = new AuthService('84N6au0Il1G8eN7irnCyyqcpXkRkMuvH', 'swolebrain.auth0.com');
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

class App extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  get content() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={childProps=> <Home {...childProps} auth={auth} />} onEnter={requireAuth} />
          <Route path="/login" render={childProps=> <Login  {...childProps} auth={auth} />} />
        </div>
      </Router>
    )
  }

  render () {
     return (
       <div style={{ height: '100vh' }}>
         {this.content}
       </div>
     )
   }
}

export default App;
