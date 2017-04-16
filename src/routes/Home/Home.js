import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../auth/AuthService';

export class Login extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div >
        <h2>Login</h2>
        <div>
          <button onClick={auth.login.bind(this)}>Login</button>
        </div>
      </div>
    )
  }
}

export default Login;
