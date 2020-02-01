import React from 'react';

import AuthPage from '../auth/AuthPage';

const Header = () => (
  <nav className='navbar navbar-light bg-primary'>
    <a className='brand-logo' href='/'>
      mern-crowdfunding-platform
    </a>
    <AuthPage />
  </nav>
);

export default Header;
