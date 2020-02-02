import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Auth from '../auth/Auth';

export default function Header(props) {
  const {
    userData: { uid, displayName, photoURL }
  } = props;

  return (
    <Navbar bg='light' expand='lg'>
      <div className='container'>
        <NavLink className='navbar-brand' to='/'>
          MCP
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {uid && (
              <>
                <Navbar.Brand>
                  <img
                    src={photoURL}
                    width='30'
                    height='30'
                    className='d-inline-block align-top mr-2 rounded-circle'
                    alt='user'
                  />
                  {displayName}
                </Navbar.Brand>
                <NavLink className='nav-link' to='/create-project'>
                  Create project
                </NavLink>
              </>
            )}
            <Auth />
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

Header.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired
  }).isRequired
};
