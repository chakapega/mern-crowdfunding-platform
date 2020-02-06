import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Nav, NavDropdown, Toast } from 'react-bootstrap';

import facebookLogo from '../../assets/images/auth_service_facebook.svg';
import googleLogo from '../../assets/images/auth_service_google.svg';
import { auth, arrayOfAuthProviders } from '../../firebase/firebase';
import { setUserData } from '../../store/auth/actions';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      isError: false,
      error: ''
    };
  }

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
        this.setState({
          isError: true,
          error: error.message
        });
      });
  }

  render() {
    const {
      userData: { uid }
    } = this.props;
    const { isError, error } = this.state;

    return (
      <>
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
        {isError && (
          <Toast
            className='bootstrap-toast'
            onClose={() => this.setState({ isError: false, error: '' })}
            show={isError}
          >
            <Toast.Header>
              <strong className='mr-auto'>Error</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        )}
      </>
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
