import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../auth/AuthService';

export class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className="login-root">
        <h2>Login</h2>
        <div className="login-button-container">
          <button onClick={auth.login.bind(this)}>Login</button>
        </div>
      </div>
    )
  }
}

export default Login;
