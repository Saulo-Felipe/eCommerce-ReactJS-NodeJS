import api from './api'

export var isAuthenticated = async function() {
    var response = await api.post('get-user')



    console.log("Dados do isAuthenticated: ", response.data) 

    return {user: response.data.user}
}