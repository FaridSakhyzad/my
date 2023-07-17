import {
  LOGIN_USER,
  LOGIN_USER_START,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,

  GET_USER,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_STOP,
  LOGIN_USER_ABORT, LOGOUT_USER,
} from './constants'

const initialState = {
  id: null,
  email: null,
  loading: false,
  error: null,
  isLoggedIn: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return state
    }

    case LOGIN_USER_START: {
      return {
        ...state,
        loading: true
      }
    }

    case LOGIN_USER_ABORT: {
      return {
        ...initialState,
      }
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        loading: false
      }
    }

    case LOGIN_USER_FAIL: {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      }
    }

    case LOGOUT_USER: {
      return {
        ...initialState,
      }
    }

    case GET_USER: {
      return state
    }

    case GET_USER_START: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        loading: false
      }
    }

    case GET_USER_FAIL: {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      }
    }

    case GET_USER_STOP: {
      return {
        ...state,
        loading: false
      }
    }

    default:
      return state
  }
}

export default userReducer
