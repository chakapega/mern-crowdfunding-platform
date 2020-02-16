import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Auth from '../auth/Auth';
import LanguageSwitch from '../languageSwitch/LanguageSwitch';
import { interfaceTexts } from '../../shared/constants';

function Header({ language, userData: { uid, displayName, photoURL } }) {
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
                <Navbar.Brand>
                  <Image
                    src={photoURL}
                    width='30'
                    height='30'
                    className='d-inline-block align-top mr-2 rounded-circle'
                    alt='user'
                  />
                  {displayName}
                </Navbar.Brand>
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
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData,
  language: state.language.language
});

export default connect(mapStateToProps)(Header);
