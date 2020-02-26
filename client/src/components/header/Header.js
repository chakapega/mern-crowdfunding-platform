import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Auth from '../auth/Auth';
import UserDetails from '../user/UserDetails';
import LanguageSwitch from '../languageSwitch/LanguageSwitch';
import Search from '../search/Search';
import { interfaceTexts } from '../../shared/constants';

function Header({ language, userData: { uid, role, status } }) {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand className='ml-5' as={NavLink} to='/'>
        MCP
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav' className='mr-5'>
        <Search />
        <Nav>
          {uid && (
            <>
              {role === 'admin' && (
                <Nav.Link as={NavLink} to='/admin-page'>
                  {interfaceTexts.adminPage[language]}
                </Nav.Link>
              )}
              <UserDetails />
              <Nav.Link disabled={status === 'blocked'} as={NavLink} to='/create-project'>
                {interfaceTexts.createProject[language]}
              </Nav.Link>
            </>
          )}
          <Auth />
          <LanguageSwitch />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  language: state.language.language,
  userData: state.user.userData
});

export default connect(mapStateToProps)(Header);
