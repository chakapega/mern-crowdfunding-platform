import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Nav, NavDropdown } from 'react-bootstrap';

import facebookLogo from '../../assets/images/auth_service_facebook.svg';
import googleLogo from '../../assets/images/auth_service_google.svg';
import { auth, arrayOfAuthProviders } from '../../firebase/firebase';
import { setUserData } from '../../store/auth/actions';

class Auth extends Component {
  signOut = () => {
    const { setUserDataAction } = this.props;

    auth.signOut().then(() => {
      setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '' });
    });
  };

  signIn(authProvider) {
    const { setUserDataAction } = this.props;

    auth
      .signInWithPopup(arrayOfAuthProviders[authProvider])
      .then(result => {
        const { uid, email, displayName, photoURL } = result.user;
        this.isAutorized = true;

        setUserDataAction({ uid, email, displayName, photoURL });
        fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify({ uid, email, displayName }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
      .catch(error => {
        if (window.M) {
          window.M.toast({ html: error.message });
        }
      });
  }

  render() {
    const {
      userData: { uid }
    } = this.props;

    return (
      <Nav className='ml-auto'>
        {uid ? (
          <Nav.Link onClick={this.signOut}>Sign out</Nav.Link>
        ) : (
          <NavDropdown title='Sign in' id='basic-nav-dropdown'>
            <NavDropdown.Item onClick={() => this.signIn('google')}>
              <img className='sign-in-image mr-2' src={googleLogo} width='20' height='20' alt='auth-service-google' />
              Google
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => this.signIn('facebook')}>
              <img
                className='sign-in-image mr-2'
                src={facebookLogo}
                width='20'
                height='20'
                alt='auth-service-facebook'
              />
              Facebook
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
    );
  }
}

Auth.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired
  }).isRequired,
  setUserDataAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData
});
const mapDispatchToProps = dispatch => ({
  setUserDataAction: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
