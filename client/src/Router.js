import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { auth } from './firebase/firebase';
import { setUserData } from './store/auth/actions';
import Header from './components/header/Header';
import ProjectsPreviewPage from './components/projects/ProjectsPreviewPage';
import CreateProjectPage from './components/projects/CreateProjectPage';
import Project from './components/projects/Project';

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
      requestStatus,
      userData: { uid }
    } = this.props;

    if (uid) {
      return (
        <>
          {requestStatus && (
            <div className='botstrap-spinner-container'>
              <Spinner animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </div>
          )}
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path='/' component={ProjectsPreviewPage} exact />
              <Route path='/project/:id' component={Project} exact />
              <Route path='/create-project' component={CreateProjectPage} exact />
              <Redirect to='/' />
            </Switch>
          </BrowserRouter>
        </>
      );
    }

    return (
      <>
        {requestStatus && (
          <div className='botstrap-spinner-container'>
            <Spinner animation='border' role='status'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          </div>
        )}
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' component={ProjectsPreviewPage} exact />
            <Route path='/project/:id' component={Project} exact />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </>
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
  setUserDataAction: PropTypes.func.isRequired,
  requestStatus: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData,
  requestStatus: state.loader.requestStatus
});
const mapDispatchToProps = dispatch => ({
  setUserDataAction: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
