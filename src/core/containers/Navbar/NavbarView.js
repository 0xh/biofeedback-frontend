import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { GoogleLogout } from 'react-google-login';

import { Link } from 'react-router-dom';

const NavbarView = ({
  toggle, isOpen, logout, isLoggedIn,
}) => (
  <Navbar color="dark" dark expand="md">
    <Link className="navbar-brand" to="/">
      Biofeedback
    </Link>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>
      <Nav navbar>
        <NavItem>
          <Link className="nav-link" to="/institution/">Institutions</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/">asd</Link>
        </NavItem>
        {
        isLoggedIn ? (
          <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        ) : (
          <NavItem>
            <Link className="nav-link" to="/login">Login</Link>
          </NavItem>
        )
      }
      </Nav>


    </Collapse>

  </Navbar>
);

NavbarView.propTypes = {
  logout: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavbarView;
