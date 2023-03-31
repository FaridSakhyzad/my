import {
  GET_USER,
  CREATE_USER,
  LOGIN_USER,
  GET_USER_PROFILE,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from './constants'

export const createUser = (data) => ({
  type: CREATE_USER,
  payload: data
});

export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload: data
})

export const getUserProfile = (data) => ({
  type: GET_USER_PROFILE,
  payload: data
})

export const getUserProfileStart = (data) => ({
  type: GET_USER_PROFILE_START,
  payload: data
})

export const getUserProfileSuccess = (data) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: data
})

export const getUserProfileFail = (data) => ({
  type: GET_USER_PROFILE_FAIL,
  payload: data
})

export const getUser = (data) => ({
  type: GET_USER,
  payload: data
})
