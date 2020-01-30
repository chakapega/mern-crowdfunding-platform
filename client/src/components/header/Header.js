import React from 'react';

import Auth from '../auth/Auth';

const Header = () => (
  <nav className='navbar navbar-light bg-light'>
    <a className='navbar-brand' href='/'>
    mern-crowdfunding-platform
    </a>
    <Auth />
  </nav>
);

export default Header;
