import api from './api'

export var isAuthenticated = async function() {
    const userToken = localStorage.getItem('token_login')

    if (userToken) {
        var response = await api.post('/get-user', { token: userToken })

        if (response.data.token_isValid === false) {
            localStorage.removeItem('token_login')
            return null
        } else {
            var user = response.data.user[0]
            console.log('Teste: ', user)
            return user
        }
    } else {
        return null
    }

}