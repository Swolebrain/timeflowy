import './App.css';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux';

import AuthService from './auth/AuthService';
import {Home} from './routes/Home';
import {Login} from './routes/Login';


class App extends Component {
  constructor(props){
    super(props);
    console.log("App component constructor");
    this.auth = new AuthService('84N6au0Il1G8eN7irnCyyqcpXkRkMuvH',
                                  'swolebrain.auth0.com',
                                  ()=>{   console.log("auth callback"); this.setState({authenticated: true})  });
    this.state = {
      authenticated: this.auth.loggedIn()
    }
  }
  static contextTypes = {
    router: PropTypes.object
  }
  clientSideAuth = (childProps) => {
    if (this.auth.loggedIn()){
      return <Home {...childProps} auth={this.auth} />
    }
    else return <Login  {...childProps} auth={this.auth} />;
  }
  get content() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" render={this.clientSideAuth} />
            <Route path="/login" render={this.clientSideAuth} />
          </div>
        </Router>
      </Provider>
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
