import Api from './api';

export const getUser = async () => {
  return Api.get('/endpoint1', {
    params: {
      id: '1345',
    }
  }).then((response) => {
    return response
  }).catch((error) => {
    console.error('backend error. details:', error);
  })
}
