import React, { memo, useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { getUser } from '../redux/user/actions';

const ComponentB = ({ value }) => {
  useEffect(() => {
    // console.log('COMPONENT B RERENDER');
  });

  return (
    <h1>Component B {value}</h1>
  )
}

export default memo(ComponentB, (prevProps, nextProps) => {
  console.log(nextProps.value);

  return (nextProps.value % 6) > 0;
})
