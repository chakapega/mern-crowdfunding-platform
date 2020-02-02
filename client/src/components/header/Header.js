import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { auth } from '../../firebase/firebase';
import { setUserData } from '../../store/auth/actions';

class Header extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems);
  }

  signOut = () => {
    const { setUserDataAction } = this.props;

    auth.signOut().then(() => {
      setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '' });
    });
  };

  render() {
    const { uid } = this.props.userData;

    return (
      <>
        <nav>
          <div className='container'>
            <div className='nav-wrapper'>
              <NavLink to='/' className='brand-logo'>
                MCP
              </NavLink>
              <a data-target='mobile-demo' className='sidenav-trigger'>
                <i className='material-icons'>menu</i>
              </a>
              <ul className='right hide-on-med-and-down'>
                {uid ? (
                  <li>
                    <a href='signOut' className='sidenav-close' onClick={this.signOut}>
                      Sign out
                    </a>
                  </li>
                ) : (
                  <li>
                    <NavLink to='/auth' className='sidenav-close'>
                      Sign in
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <ul className='sidenav' id='mobile-demo'>
          {uid ? (
            <li>
              <a href='signOut' className='sidenav-close' onClick={this.signOut}>
                Sign out
              </a>
            </li>
          ) : (
            <li>
              <NavLink to='/auth' className='sidenav-close'>
                Sign in
              </NavLink>
            </li>
          )}
        </ul>
      </>
    );
  }
}

Header.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
