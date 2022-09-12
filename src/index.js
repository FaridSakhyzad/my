import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Cookies from 'js-cookie';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Api from './api/api';

const root = ReactDOM.createRoot(document.getElementById('root'));

const sessionId = Cookies.get('session-id');

if (!sessionId) {
  Cookies.set('session-id', Math.random().toString().slice(2, 11));
}

const getSessionInfo = async function() {
  const result = await Api.get('/getSessionInfo', { params: { sessionId } });
  console.log('result', result);
  return result;
}

const sessionInfo = getSessionInfo();

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
