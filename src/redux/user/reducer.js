import {
  GET_USER,
  CREATE_USER,
  GET_USER_PROFILE,
  LOGIN_USER,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from './constants'

const initialState = {
  id: null,
  email: null,
  // firstName: null,
  // secondName: null,
  loading: false,
  error: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        user: action.payload,
      }
    }
    case CREATE_USER: {
      return state
    }
    case LOGIN_USER: {
      return state
    }
    case GET_USER_PROFILE: {
      return state
    }
    case GET_USER_PROFILE_START: {
      return {
        loading: true,
        error: false,
        ...state
      }
    }
    case GET_USER_PROFILE_SUCCESS: {
      console.log('GET_USER_PROFILE_SUCCESS', action);

      return {
        ...action.payload.data,
        loading: false,
        ...state
      }
    }
    case GET_USER_PROFILE_FAIL: {
      console.log('GET_USER_PROFILE_FAIL', action);

      return {
        loading: false,
        error: true,
        ...state
      }
    }
    default:
      return state
  }
}

export default userReducer
