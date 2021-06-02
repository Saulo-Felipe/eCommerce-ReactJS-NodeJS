import React, { useState } from 'react'
import api from '../../services/api'

export default function Modal() {
  const [login, setLogin] = useState({
    email: null,
    password: null
  })

  function handleChangeInput(inputValue) {
    setLogin({
      email: inputValue.target.id == "email_login" ? inputValue.target.value : login.email,
      password: inputValue.target.id == "password_login" ? inputValue.target.value : login.password
    })
  }

  async function handleSubmitForm() {
    if (login.email == null || login.email == null)
      alert("preencha todos os campos")
    else
      if (login.email.length == 0 || login.password.length == 0)
        alert("preencha todos os dados")
      else
        await api.post("/login", login)

  }


  return (
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Faça Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>

              <label htmlFor="email_login">Email</label>
              <input type="email" id="email_login" className="form-control mb-3" onChange={handleChangeInput}/>

              <label htmlFor="password_login">Senha</label>
              <input type="password" id="password_login" className="form-control mb-3" onChange={handleChangeInput}/>

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" onClick={handleSubmitForm}>Fazer Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
