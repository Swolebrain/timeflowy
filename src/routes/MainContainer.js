import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MainContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    let children = null;
    console.log(typeof this.props.children);
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      });
    }

    return (
      <div className="main-container">
        <h2 className={"main-title"}>
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" alt="Please Log In"/>
        </h2>
        {children}
      </div>
    )
  }
}

export default MainContainer;
