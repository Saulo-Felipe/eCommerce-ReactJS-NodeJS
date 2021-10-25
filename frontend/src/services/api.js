import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DEVELOPMENT,
  withCredentials: true
})

api.defaults.headers.common['authorization'] = localStorage.getItem('token_login')



export default api
