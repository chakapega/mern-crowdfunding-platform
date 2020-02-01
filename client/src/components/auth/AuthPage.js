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

        fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ uid, email }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        if (window.M) window.M.toast({ html: error.message, displayLength: 10000 });
        setLoading(false);
      });
  };

  return (
    <div className='auth-container'>
      <button
        className='sign-in-button btn transparent'
        type='button'
        onClick={() => signIn('facebook')}
        disabled={loading}
      >
        <img className='sign-in-provider-image' src={facebookLogo} alt='auth-facebook' />
      </button>
      <button
        className='sign-in-button btn transparent'
        type='button'
        onClick={() => signIn('google')}
        disabled={loading}
      >
        <img className='sign-in-provider-image' src={googleLogo} alt='auth-google' />
      </button>
    </div>
  );
}

// import React, { Component } from 'react';

// import facebookLogo from '../../assets/images/auth_service_facebook.svg';
// import googleLogo from '../../assets/images/auth_service_google.svg';
// import { auth, arrayOfAuthProviders } from '../../firebase/firebase';

// export default class AuthPage extends Component {
//   componentDidMount() {
//     auth.onAuthStateChanged(user => {
//       if (user) {
//         const { uid, displayName, photoURL, email } = user;
//       } else {
//       }
//     });
//   }

//   signOut = () => {
//     auth.signOut().then(() => {});
//   };

//   signIn(authProvider) {
//     auth
//       .signInWithPopup(arrayOfAuthProviders[authProvider])
//       .then(result => {
//         const { uid, displayName, photoURL, email } = result.user;
//         this.isAutorized = true;
//         fetch('/api/auth/login', {
//           method: 'POST',
//           body: JSON.stringify({ uid, email }),
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
//       })
//       .catch(error => {
//         if (window.M) {
//           window.M.toast({ html: error.message });
//         }
//       });
//   }

//   render() {
//     return (
//       <div className='auth-container'>
//         <button className='sign-in-button btn transparent' type='button' onClick={() => this.signIn('facebook')}>
//           <img className='sign-in-provider-image' src={facebookLogo} alt='auth-facebook' />
//         </button>
//         <button className='sign-in-button btn transparent' type='button' onClick={() => this.signIn('google')}>
//           <img className='sign-in-provider-image' src={googleLogo} alt='auth-google' />
//         </button>
//       </div>
//     );
//   }
// }
