import axios from 'axios';

const Api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3007',
})

export default Api;
