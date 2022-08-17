import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3007',
})

export default Api;
