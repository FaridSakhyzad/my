import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ThemeContext from './context';

import store from './redux/store';

import Layout from  './Layout'
import Home from './routes/Home';
import Profile from './routes/Profile';
import Authorization from './routes/Authorization';
import './assets/App.css';

function App() {
  const [ theme, setTheme ] = useState('dark1')

  const onButtonClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="auth" element={<Authorization />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </Layout>
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
