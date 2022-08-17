import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { getUser } from '../redux/user/actions';

const Home = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    document.cookie = 'asdf=1234';

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
