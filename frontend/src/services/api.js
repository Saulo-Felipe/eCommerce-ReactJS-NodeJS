import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DEVELOPMENT,
  withCredentials: true
})

api.defaults.headers.common['authorization'] = localStorage.getItem('token_login')

api.interceptors.response.use((response) => {
  const token = localStorage.getItem('token_login')

  if (response.data.token_isValid === false && token !== null) {
    localStorage.removeItem('token_login')
    window.location.href = "/"
  }
  
  return response
})

export default api
