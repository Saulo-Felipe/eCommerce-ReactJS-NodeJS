import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'


function Modal() {

  const [login, setLogin] = useState({
    email: null,
    password: null
  })

  function handleChangeInput(inputValue) {
    setLogin({
      email: inputValue.target.id ==="email_login" ? inputValue.target.value : login.email,
      password: inputValue.target.id === "password_login" ? inputValue.target.value : login.password
    })
  }

  async function handleSubmitForm() {
    if (login.email === null || login.email === null)
      alert("preencha todos os campos")
    else {
      if (login.email.length === 0 || login.password.length === 0)
        alert("preencha todos os dados")
      else {
        var response = await api.post("/login", login)

        if (response.data.error) {
          alert(response.data.error)
        } else {
          alert('Login realziado com sucesso!')
          localStorage.setItem("id", `${response.data.id}`)
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
              <form>

                <label htmlFor="email_login">Email</label>
                <input type="email" id="email_login" className="form-control mb-3" onChange={handleChangeInput}/>

                <label htmlFor="password_login">Senha</label>
                <input type="password" id="password_login" className="form-control mb-3" onChange={handleChangeInput}/>

              </form>
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