import React, { useState } from 'react'
import './S-Register.css'
import api from '../../services/api'

export default function Register() {
  const [inputValue, SetInputValue] = useState({
    name: null,
    email: null,
    password: null,
    passwordTwo: null
  })

  async function NewUser() {
    if (inputValue.name === null || inputValue.email === null || inputValue.password === null || inputValue.passwordTwo === null) {
      alert("Preencha todos os campos")
    } else {
      if (inputValue.name.length === 0 || inputValue.email.length === 0 || inputValue.password.length === 0 || inputValue.passwordTwo.length === 0) {
        alert("preencha todos os dados")
      } else {
        if (inputValue.password === inputValue.passwordTwo) {
          var response = await api.post('/register', inputValue)
          console.log('response: ', response)
          if (response.data.error) {
            alert(response.data.error)
          } else {
            alert('Cadastro realizado com sucesso!')
          }
        } else {
          alert("as senhas não estão iguais")
        }
      }
    }
  }
  function handleChangeInput(values) {
    SetInputValue({
      name: values.target.id === "name" ? values.target.value : inputValue.name,
      email: values.target.id === "email" ? values.target.value : inputValue.email,
      password: values.target.id === "password" ? values.target.value : inputValue.password,
      passwordTwo: values.target.id === "password-two" ? values.target.value : inputValue.passwordTwo
    })
  }
  return (
    <div className="container">
      <div className="RegisterForm">
        <h4 className="mb-2">Cadastre-se</h4>
        <hr/>
        <form className="mt-3">

          <label htmlFor="name">Nome</label>
          <input autoComplete="off" type="text" id="name" className="form-control mb-2" placeholder="Digite seu nome completo" onChange={handleChangeInput} required/>

          <label htmlFor="email ">Email</label>
          <input autoComplete="off" type="text" id="email" className="form-control mb-2" placeholder="Digite um email válido" onChange={handleChangeInput} required/>

          <label htmlFor="password ">Senha</label>
          <input autoComplete="off" type="password" id="password" className="form-control mb-2" onChange={handleChangeInput} required/>

          <label htmlFor="password-two ">Repita a senha</label>
          <input autoComplete="off" type="password" id="password-two" className="form-control mb-2" onChange={handleChangeInput} required/>

          <button type="button" className="btn btn-success mt-2" onClick={() => {NewUser()}}>Finalizar Cadastro</button>
        </form>
      </div>
    </div>
  )
}
