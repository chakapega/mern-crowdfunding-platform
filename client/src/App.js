import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Router from './Router';
// import Header from './components/header/Header';

const App = () => (
  <Provider store={store}>
    {/* <BrowserRouter> */}
      {/* <Header /> */}
      <Router />
    {/* </BrowserRouter> */}
  </Provider>
);

export default App;
