import React, { useState } from 'react';

import facebookLogo from '../../assets/images/auth_service_facebook.svg';
import googleLogo from '../../assets/images/auth_service_google.svg';
import { auth, arrayOfAuthProviders } from '../../firebase/firebase';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);

  const signIn = authProvider => {
    setLoading(true);
    auth
      .signInWithPopup(arrayOfAuthProviders[authProvider])
      .then(result => {
        const { uid, displayName, photoURL, email } = result.user;

        fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify({ email, uid, displayName }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <div className='auth-container'>
      <button
        className='sign-in-button btn btn-light'
        type='button'
        onClick={() => signIn('facebook')}
        disabled={loading}
      >
        <img className='sign-in-provider-image' src={facebookLogo} alt='auth-facebook' />
      </button>
      <button
        className='sign-in-button btn btn-light'
        type='button'
        onClick={() => signIn('google')}
        disabled={loading}
      >
        <img className='sign-in-provider-image' src={googleLogo} alt='auth-google' />
      </button>
    </div>
  );
}
