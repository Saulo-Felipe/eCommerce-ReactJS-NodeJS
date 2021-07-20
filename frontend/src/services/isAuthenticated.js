import api from './api'

export var isAuthenticated = async function() {
    var response = await api.post('get-user')
    
    return response.data.user
}