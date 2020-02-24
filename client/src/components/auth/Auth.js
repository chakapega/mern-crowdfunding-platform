import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Nav, NavDropdown, Toast } from 'react-bootstrap';

import facebookLogo from '../../assets/images/auth_service_facebook.svg';
import googleLogo from '../../assets/images/auth_service_google.svg';
import { auth, arrayOfAuthProviders } from '../../firebase/firebase';
import { setUserData } from '../../store/auth/actions';
import { interfaceTexts } from '../../shared/constants';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      isError: false,
      error: ''
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      const { setUserDataAction } = this.props;

      if (user) {
        const { uid, email, displayName, photoURL } = user;

        setTimeout(() => {
          fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ uid, email, displayName }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(response => {
              const {
                user: { role, status }
              } = response;
              setUserDataAction({ uid, email, displayName, photoURL, role, status });
            });
        }, 1555);
      } else {
        setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '', role: '', status: '' });
      }
    });
  }

  signOut = () => {
    const { setUserDataAction } = this.props;

    auth.signOut().then(() => {
      setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '', role: '', status: '' });
    });
  };

  signIn(authProvider) {
    const { setUserDataAction } = this.props;

    auth
      .signInWithPopup(arrayOfAuthProviders[authProvider])
      .then(result => {
        const { uid, email, displayName, photoURL } = result.user;

        fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify({ uid, email, displayName }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(response => {
            const {
              user: { role, status }
            } = response;
            setUserDataAction({ uid, email, displayName, photoURL, role, status });
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
      language,
      userData: { uid }
    } = this.props;
    const { isError, error } = this.state;

    return (
      <>
        {uid ? (
          <Nav.Link onClick={this.signOut}>{interfaceTexts.signOut[language]}</Nav.Link>
        ) : (
          <NavDropdown title={interfaceTexts.signIn[language]} id='basic-nav-dropdown'>
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
          <div className='bootstrap-toast-container'>
            <Toast onClose={() => this.setState({ isError: false, error: '' })} show={isError}>
              <Toast.Header>
                <strong className='mr-auto'>{interfaceTexts.error[language]}</strong>
              </Toast.Header>
              <Toast.Body>{error}</Toast.Body>
            </Toast>
          </div>
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
  setUserDataAction: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData,
  language: state.language.language
});
const mapDispatchToProps = dispatch => ({
  setUserDataAction: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
