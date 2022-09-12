import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { getUser } from '../redux/user/actions';

const Home = (props) => {
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getUser());
  })

  return (
    <>
      <Header />
      <h1>Home</h1>
    </>
  )
}

export default Home
