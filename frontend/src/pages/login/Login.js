import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

  
function Modal() {

  const [login, setLogin] = useState({ email: null, password: null })
  const History = useHistory()
  const [loading, setLoading] = useState()
  const [logs, setLogs] = useState()

  useEffect(() => {
    var enter = document.querySelectorAll('.login-focus')

    for (var c=0; c < enter.length; c++) {
      enter[c].addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          handleSubmitForm()
        }
      })
    }
    

  }, [])

  function handleChangeInput(inputValue) {
    setLogin({
      email: inputValue.target.id ==="email_login" ? inputValue.target.value : login.email,
      password: inputValue.target.id === "password_login" ? inputValue.target.value : login.password
    })
  }

  async function handleSubmitForm() {
    if (login.email === null || login.email === null)
      setLogs(<div className="mb-2 text-center text-danger">Preencha todos os campos</div>) 
    else {
      if (login.email.length === 0 || login.password.length === 0)
        setLogs(<div className="mb-2 text-center text-danger">Preencha todos os dados</div>) 
      else {
        setLoading(<div className="text-center mb-2"><img width="80px" src={require("../../images/Infinity-loading.gif").default} alt="loading gif" /></div>)
        var response = await api.post("/login", login)
        setLoading()

        

        if (response.data.error || response.data.message) {
          setLogs(<div className="mb-2 text-center text-danger">{response.data.error || response.data.message}</div>) 
        } else {
          setLogs(<div className="mb-2 text-center text-success">Login realziado com sucesso, redirecionando...</div>) 
          window.location.href = "/"
        }
      }
    }

  }

  function closeModal() {
    document.querySelector('.close-modal').click()
  }


  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Faça Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {logs}
              <form>

                <label htmlFor="email_login">Email</label>
                <input autoComplete="off" type="email" id="email_login" name="email" className="form-control mb-3 login-focus" onChange={handleChangeInput}/>

                <label htmlFor="password_login">Senha</label>
                <input autoComplete="off" type="password" id="password_login" name="password" className="form-control mb-3 login-focus" onChange={handleChangeInput}/>

              </form>
              {loading}
              <small>
                Não tem uma conta? <Link to="/register" onClick={closeModal}>Cadastre-se</Link>
              </small>
            </div>


            <div className="modal-footer">
              <button type="button" className="btn btn-secondary close-modal" data-bs-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitForm}>Fazer Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { Modal }