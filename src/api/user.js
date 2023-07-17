import Api from './api';

export const createUser = async (data) => {
  return Api.post('/createUser', data).then((response) => {
    return response
  }).catch((error) => {
    console.error('Backend error. details:', error);
  })
}

export const loginUser = async (data) => {
  return Api.post('/loginUser', data).then((response) => {
    return response
  }).catch((error) => {
    console.error('Backend error. details:', error);
  });
}

export const logoutUser = async () => {
  return Api.post('/logoutUser').then((response) => {
    return response
  }).catch((error) => {
    console.error('Backend error. details:', error);
  });
}

export const getUser = async () => {
  return Api.get('/user').then((response) => {
    return response
  }).catch((error) => {
    console.error('Backend error. details:', error);
  })
}
