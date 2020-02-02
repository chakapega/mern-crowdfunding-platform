import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { auth } from './firebase/firebase';
import { setUserData } from './store/auth/actions';
import Header from './components/header/Header';
import ProjectsPage from './components/projects/ProjectsPage';
import CreateProjectPage from './components/projects/CreateProjectPage';

class Router extends Component {
  constructor(props) {
    super();

    auth.onAuthStateChanged(user => {
      const { setUserDataAction } = props;

      if (user) {
        const { uid, email, displayName, photoURL } = user;

        setUserDataAction({ uid, email, displayName, photoURL });
      } else {
        setUserDataAction({ uid: '', email: '', displayName: '', photoURL: '' });
      }
    });
  }

  render() {
    const {
      userData: { uid, displayName, photoURL }
    } = this.props;

    if (uid) {
      return (
        <BrowserRouter>
          <Header userData={{ uid, displayName, photoURL }} />
          <Switch>
            <Route path='/' exact>
              <ProjectsPage />
            </Route>
            <Route path='/create-project' exact>
              <CreateProjectPage />
            </Route>
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <BrowserRouter>
        <Header userData={{ uid, displayName }} />
        <Switch>
          <Route path='/' exact>
            <ProjectsPage />
          </Route>
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    );
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
