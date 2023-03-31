import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import {createUser, getUserProfile, loginUser} from '../redux/user/actions';
import './home.scss';

const Home = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

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

      <form className="signUpForm" onSubmit={handleLoginFormSubmit}>
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
      </form>
    </>
  )
}

export default Home
