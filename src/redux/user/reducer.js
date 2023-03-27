import {CREATE_USER, GET_USER, LOGIN_USER} from './constants'

const initialState = {
  user: {
    id: 'temp',
    email: 'mail@mail.com',
    firstName: 'lorem',
    secondName: 'ipsum',
  },
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
    default:
      return state
  }
}

export default userReducer
