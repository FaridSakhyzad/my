import { CREATE_USER, LOGIN_USER, GET_USER } from './constants'

export const createUser = (data) => ({
  type: CREATE_USER,
  payload: data
});

export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload: data
})

export const getUser = (data) => ({
  type: GET_USER,
  payload: data
})
