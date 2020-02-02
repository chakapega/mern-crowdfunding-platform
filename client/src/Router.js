import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { auth } from './firebase/firebase';
import Header from './components/header/Header';
import ProjectsPage from './components/projects/ProjectsPage';
import SignIn from './components/auth/SignIn';
import { setUserData } from './store/auth/actions';

class Router extends Component {
  constructor(props) {
    super();

    this.state = {
      isAuthReady: false
    };

    auth.onAuthStateChanged(user => {
      const { setUserDataAction } = props;

      if (user) {
        const { uid, email, displayName, photoURL } = user;

        setUserDataAction({ uid, email, displayName, photoURL });
        this.setState({
          isAuthReady: true
        });
      } else {
        setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '' });
        this.setState({
          isAuthReady: true
        });
      }
    });
  }

  render() {
    const { uid } = this.props.userData;
    const { isAuthReady } = this.state;

    if (!isAuthReady) {
      return (
        <div className='progress'>
          <div className='indeterminate'></div>
        </div>
      );
    }

    if (uid) {
      return (
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact>
              <ProjectsPage />
            </Route>
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      );
    }

    if (!uid) {
      return (
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact>
              <ProjectsPage />
            </Route>
            <Route path='/auth' exact>
              <SignIn />
            </Route>
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

Router.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Router);
