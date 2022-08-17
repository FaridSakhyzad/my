import { Provider } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import store from './redux/store';

import Home from './routes/Home';
import Profile from './routes/Profile';
import Authorization from './routes/Authorization';
import './assets/App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<Authorization />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
