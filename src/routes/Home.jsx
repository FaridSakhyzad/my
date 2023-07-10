import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import {createUser, getUser, loginUser} from '../redux/user/actions';
import './home.scss';

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {}, []);

  const user = useSelector(({ user }) => user);

  const { loading, isLoggedIn, email, error } = user;

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    dispatch(createUser({
      email: formData.get('email'),
      password: formData.get('password'),
    }))
  }

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    dispatch(loginUser({
      email: formData.get('email'),
      password: formData.get('password'),
      remember: formData.get('remember') !== null,
    }));
  }

  const handleLogoutClick = () => {
    console.log('adf');
  }

  return (
    <>
      <Header />
      <h1>Home</h1>
      <form className="signUpForm" onSubmit={handleSignupFormSubmit}>
        <div className="signUpForm-row">
          <input type="email" placeholder="email" className="signUpForm-input" name="email" value="farid.sakhyzad@gmail.com" />
        </div>
        <div className="signUpForm-row">
          <input type="password" placeholder="password" className="signUpForm-input" name="password" value="12345" />
        </div>
        <div className="signUpForm-row">
          <button type="submit" className="signUpForm-button">Sign Up</button>
        </div>
      </form>

      {!isLoggedIn ? (
        <form className={`signUpForm ${loading ? 'signUpForm_loading' : ''}` } onSubmit={handleLoginFormSubmit}>
          <div className="signUpForm-row">
            <input type="email" required placeholder="email" className="signUpForm-input" name="email" />
          </div>
          <div className="signUpForm-row">
            <input type="password" required placeholder="password" className="signUpForm-input" name="password" />
          </div>
          <div className="signUpForm-row">
            <label><input type="checkbox" name="remember" />remember me</label>
          </div>
          <div className="signUpForm-row">
            <button type="submit" className="signUpForm-button">Login</button>
          </div>
          {error && (
              <div>error: {error}</div>
          )}
        </form>
      ) : (
          <div>
            <div>User email: {email}</div>
            <div>
              <button type="button" className="signUpForm-button" onClick={handleLogoutClick}>Logout</button>
            </div>
          </div>
      )}
    </>
  )
}

export default Home
