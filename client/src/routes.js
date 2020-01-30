import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProjectsPage from './components/ProjectsPage';
import CreateProjectPage from './components/CreateProjectPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <ProjectsPage />
        </Route>
        <Route path='/create-project' exact>
          <CreateProjectPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/' exact>
        <ProjectsPage />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
};
