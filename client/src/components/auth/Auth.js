import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import facebookLogo from '../../assets/images/auth_service_facebook.svg';
import googleLogo from '../../assets/images/auth_service_google.svg';
import { auth, arrayOfAuthProviders } from '../../firebase/firebase';
import { setUserData } from '../../store/auth/actions';

class Auth extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      const { setUserDataAction } = this.props;

      if (user) {
        const { uid, email, displayName, photoURL } = user;

        setUserDataAction({ uid, email, displayName, photoURL });
      } else {
        setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '' });
      }
    });
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
        if (window.M) {
          window.M.toast({ html: error.message });
        }
      });
  }

  render() {
    const {
      userData: { email }
    } = this.props;

    return (
      <ul className='right hide-on-med-and-down'>
        {email ? (
          <button className='btn btn-primary' type='button' onClick={this.signOut}>
            Sign out
          </button>
        ) : (
          <>
            <button className='btn waves-effect waves-light' type='button' onClick={() => this.signIn('facebook')}>
              <img src={facebookLogo} width='30' height='30' alt='auth-service-facebook' />
            </button>
            <button className='btn waves-effect waves-light' type='button' onClick={() => this.signIn('google')}>
              <img src={googleLogo} width='28' height='28' alt='auth-service-google' />
            </button>
          </>
        )}
      </ul>
    );
  }
}

Auth.propTypes = {
  setUserDataAction: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData
});
const mapDispatchToProps = dispatch => ({
  setUserDataAction: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
