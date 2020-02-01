import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useRoutes } from './routes';
import Header from './components/header/Header';
import Main from './components/main/Main';

export default function App() {
  const routes = useRoutes(false);

  return (
    <BrowserRouter>
      {/* <Header />
      <Main /> */}
      {routes}
    </BrowserRouter>
  );
}
