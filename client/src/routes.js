import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CreateProject from './components/projects/CreateProject';
import AuthPage from './components/auth/AuthPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/create-project' exact>
          <CreateProject />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/auth' exact>
        <AuthPage />
      </Route>
    </Switch>
  );
};
