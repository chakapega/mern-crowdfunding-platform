import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import facebookLogo from '../../assets/images/auth_service_facebook.svg';
import googleLogo from '../../assets/images/auth_service_google.svg';
import { auth, arrayOfAuthProviders } from '../../firebase/firebase';
import { setUserData } from '../../store/auth/actions';

class SignIn extends Component {
  // componentDidMount() {
  //   auth.onAuthStateChanged(user => {
  //     const { setUserDataAction } = this.props;

  //     if (user) {
  //       const { uid, email, displayName, photoURL } = user;

  //       setUserDataAction({ uid, email, displayName, photoURL });
  //     } else {
  //       setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '' });
  //     }
  //   });
  // }

  // signOut = () => {
  //   const { setUserDataAction } = this.props;

  //   auth.signOut().then(() => {
  //     setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '' });
  //   });
  // };

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
    return (
      <div className='sign-in-container'>
        <button
          className='sign-in-button btn waves-effect waves-light grey lighten-3'
          type='button'
          onClick={() => this.signIn('facebook')}
        >
          <img className='sign-in-image' src={facebookLogo} width='30' height='30' alt='auth-service-facebook' />
        </button>
        <button
          className='sign-in-button btn waves-effect waves-light grey lighten-3'
          type='button'
          onClick={() => this.signIn('google')}
        >
          <img className='sign-in-image' src={googleLogo} width='28' height='28' alt='auth-service-google' />
        </button>
      </div>
    );
  }
}

SignIn.propTypes = {
  setUserDataAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setUserDataAction: userData => dispatch(setUserData(userData))
});

export default connect(null, mapDispatchToProps)(SignIn);
