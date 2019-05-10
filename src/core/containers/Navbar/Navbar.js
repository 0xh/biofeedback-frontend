import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavbarView from './NavbarView';

export default class Navbar extends Component {
  state = {
    isOpen: false,
  };

  logout = async () => {
    const { userLogout } = this.props;
    await userLogout();
  };

  toggle = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }))

  render() {
    return (
      <NavbarView
        {...this.props}
        {...this.state}
        logout={this.logout}
        toggle={this.toggle}
      />
    );
  }
}

Navbar.propTypes = {
  userLogout: PropTypes.func.isRequired,
};
