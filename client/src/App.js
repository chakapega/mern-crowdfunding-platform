import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from './routes';
import Header from './components/header/Header';

export default function App() {
  const routes = useRoutes(false);

  return (
    <BrowserRouter>
      <Header />
      {routes}
    </BrowserRouter>
  );
}
