import {
  CREATE_USER,

  LOGIN_USER,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,

  GET_USER,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_STOP,
} from './constants'

export const createUser = (data) => ({
  type: CREATE_USER,
  payload: data
});

export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload: data
})

export const loginStart = () => ({
  type: LOGIN_USER_START,
})

export const loginSuccess = (data) => ({
  type: LOGIN_USER_SUCCESS,
  payload: data
})

export const loginFail = (data) => ({
  type: LOGIN_USER_FAIL,
  payload: data
})

export const getUser = (data) => ({
  type: GET_USER,
  payload: data
})

export const getUserStart = () => ({
  type: GET_USER_START,
})

export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data
})

export const getUserFail = (data) => ({
  type: GET_USER_FAIL,
  payload: data
})

export const getUserStop = () => ({
  type: GET_USER_STOP
})
