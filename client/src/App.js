import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import Header from './components/header/Header';
import Main from './components/main/Main';

const App = () => (
  <Provider store={store}>
    <Header />
    <Main />
  </Provider>
);

export default App;
