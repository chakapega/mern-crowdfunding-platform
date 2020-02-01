import React, { Component } from 'react';

export default class Header extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems);
  }

  render() {
    return (
      <>
        <nav>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              MCP
            </a>
            <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              <li>
                <a href='sass.html'>Sass</a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className='sidenav' id='mobile-demo'>
          <li>
            <a href='sass.html'>Sass</a>
          </li>
        </ul>
      </>
    );
  }
}
