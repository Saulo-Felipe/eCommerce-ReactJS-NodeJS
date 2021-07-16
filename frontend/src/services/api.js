import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DEVELOPMENT,
  withCredentials: true
})


export default api
