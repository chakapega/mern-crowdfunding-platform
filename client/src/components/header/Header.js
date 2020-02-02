import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Auth from '../auth/Auth';

export default function Header() {
  return (
    <Navbar bg='light' expand='lg'>
      <div className='container'>
        <NavLink className='navbar-brand' to='/'>
          MCP
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Auth />
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
