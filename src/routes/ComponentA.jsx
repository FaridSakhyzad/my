import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { getUser } from '../redux/user/actions';

const ComponentA = ({value}) => {

  useEffect(() => {
    // console.log('COMPONENT A USEEFFECT');
  }, []);

  return (
    <>
      {/*{console.log('COMPONENT A RENDER')}*/}
      <h1>Component A {value}</h1>
    </>
  )
}

export default ComponentA
