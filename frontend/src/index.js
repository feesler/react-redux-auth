import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import store from './store/index.js';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
