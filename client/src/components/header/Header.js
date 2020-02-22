import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Auth from '../auth/Auth';
import UserDetails from '../user/UserDetails';
import LanguageSwitch from '../languageSwitch/LanguageSwitch';
import { interfaceTexts } from '../../shared/constants';

function Header({ language, userData: { uid, role } }) {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          MCP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {uid && (
              <>
                {role === 'admin' && (
                  <Nav.Link as={NavLink} to='/admin-page'>
                    {interfaceTexts.adminPage[language]}
                  </Nav.Link>
                )}
                <UserDetails />
                <Nav.Link as={NavLink} to='/create-project'>
                  {interfaceTexts.createProject[language]}
                </Nav.Link>
              </>
            )}
            <Auth />
            <LanguageSwitch />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  language: state.language.language,
  userData: state.user.userData
});

export default connect(mapStateToProps)(Header);
