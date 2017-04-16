import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../auth/AuthService';

export class Home extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }

  render() {
    console.log("Rendering home");
    return (
      <div >
        <h2>Home</h2>

      </div>
    )
  }
}

export default Home;
