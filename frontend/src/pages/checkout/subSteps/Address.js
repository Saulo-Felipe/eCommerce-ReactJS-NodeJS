import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { changeColorsOfSteps } from '../Checkout'
import './S-SubStep.css'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'

import { useSelector, useDispatch } from 'react-redux'
import { changeAddress, selectAddress } from '../../../store/slices/checkoutSlice'


export default function Adress() {

  const dispatch = useDispatch()
  const { address } = useSelector(selectAddress)

  const [defaultInformations, setDefaultInformations] = useState({
    street: '',
		house_number: '',
		district: '',
		country: '',
		cep: '',
		city: '',
		state: '',
    user: '',
    isValid: {status: false, message: ''},
    firstName: '',
    secondName: ''
  })

  useEffect(() => {

    (async() => {
      var isLogged = await isAuthenticated()
			var {data} = await api.post('/get-adress', { id: isLogged.id })
      
      var firstName = isLogged.user_name

      delete isLogged.isAdmin
      delete isLogged.password
      delete isLogged.profile_photo
      delete isLogged.user_name

      var initialState = {...defaultInformations, ...data.result, firstName, user: isLogged}

      console.log("Inicial: ", initialState)
      
      dispatch(changeAddress(initialState))

      setDefaultInformations(initialState)

    })();

    changeColorsOfSteps(2)
  }, [])

  function inputChanges(input, type) {
    var value = input.value
    console.log("Mudando: ", type)

    if (value.length === 0) {
      input.style.border = "solid 1px red"
    } else {
      input.style.border = "1px solid #ced4da"
    }

    let newValue = {...address}
    newValue[type] = value

    dispatch(changeAddress(newValue))

  }

  function finishStep() {
    console.log("default: ", defaultInformations)
    var newObject = address

    const allKeys = Object.entries(newObject)
    const userKeys = Object.entries(newObject.user)

    delete allKeys[7]
    delete allKeys[8]
    delete allKeys[9]


    var invalidInputs = []
    for (var id of allKeys) {
      if (typeof id !== 'undefined') {
        var input = document.querySelector(`.${id[0]}`)

        if (input !== null && input.value.length === 0) {
          input.style.border = "solid 1px red"
          invalidInputs.push(input)
        }
      }
    }

    for (var key of userKeys) {
      if (typeof key !== 'undefined') {
        var input = document.querySelector(`.${key[0]}`)

        if (input !== null && input.value.length === 0) {
          input.style.border = "solid 1px red"
          invalidInputs.push(input)
        }
      }
    }

    if (invalidInputs.length === 0) {
      setDefaultInformations({...defaultInformations, isValid: { status: true }})
    } else {
      setDefaultInformations({...defaultInformations, isValid: { status: false, message: 'Verifique se todos os campos estão preenchidos.' }})

      setTimeout(() => {
        setDefaultInformations({...defaultInformations, isValid: { status: false, message: '' }})        
      }, 5000);
 
    }
  }

  
  return (
      defaultInformations.isValid.status === false 
      ? <>
        <h4 className="m-3 mb-4">Endereço para entrega</h4>
          <hr style={{opacity: "0.1"}} /> 

          <div className="checkout-address-container">
            <div className="address-form-container">
              <label className="mt-3 fw-light" htmlFor="firstName">Primeiro Nome</label>
              <input className="form-control user_name" defaultValue={defaultInformations.firstName} onChange={changes => inputChanges(changes.target, "firstName")} />

              <label className="mt-3 fw-light" htmlFor="email">Email</label>
              <input className="form-control email" defaultValue={defaultInformations.user.email} onChange={changes => inputChanges(changes.target, "email")}/>
              
              <label className="mt-3 fw-light" htmlFor="country">País</label>
              <input className="form-control country" defaultValue="Brasil" onChange={changes => inputChanges(changes.target, "country")}/>

              <label className="mt-3 fw-light" htmlFor="street">Rua</label>
              <input className="form-control street" defaultValue={defaultInformations.street} onChange={changes => inputChanges(changes.target, "address")}/>

              <label className="mt-3 fw-light" htmlFor="state">Estado</label>
              <input className="form-control state" defaultValue={defaultInformations.state} onChange={changes => inputChanges(changes.target, "state")}/>

              <label className="mt-3 fw-light" htmlFor="Msg">Mensagem para o vendedor (opcional)</label>
              <input className="form-control" placeholder={`"Me envie um brinde surpresa"`} />

            </div>

            <div className="address-form-container">
              <label className="mt-3 fw-light" htmlFor="secondName">Segundo Nome</label>
              <input className="form-control secondName" defaultValue={defaultInformations.secondName} onChange={changes => inputChanges(changes.target, "secondName")}/>

              <label className="mt-3 fw-light" htmlFor="phone">Número de telefone</label>
              <input className="form-control phone" defaultValue={defaultInformations.user.phone} onChange={changes => inputChanges(changes.target, "phoneNumber")}/>

              <label className="mt-3 fw-light" htmlFor="city">Cidade</label>
              <input className="form-control city" defaultValue={defaultInformations.city} onChange={changes => inputChanges(changes.target, "city")}/>

              <label className="mt-3 fw-light" htmlFor="district">Bairro</label>
              <input className="form-control district" defaultValue={defaultInformations.district} onChange={changes => inputChanges(changes.target, "district")}/>

              <label className="mt-3 fw-light" htmlFor="cep">CEP</label>
              <input className="form-control cep" defaultValue={defaultInformations.cep} onChange={changes => inputChanges(changes.target, "cep")}/>

              <label className="mt-3 fw-light" htmlFor="house_number">Número da residencia</label>
              <input className="form-control house_number" defaultValue={defaultInformations.house_number} onChange={changes => inputChanges(changes.target, "house_number")}/>
            </div>
          </div>
          
          <div className="text-danger text-center mt-3">{defaultInformations.isValid.message}</div>

          <hr style={{opacity: "0.1"}} className="mt-4 mb-4 ms-3 me-3"/> 

          <div className="d-flex">
            <input class="form-check-input me-2" type="checkbox" id="receiveEmails" defaultChecked />
            <label htmlFor="receiveEmails" className="text-secondary">Receber emails sobre atualizações do meu pedido</label>
          </div>

          <div className="d-flex mb-5">
            <Link style={{flex: 'auto'}} to={"/my-shopping-cart"} className="no-href-decoration w-auto">
              <button className="btn btn-secondary form-control mt-4 me-2 p-2 shadow">
                <i class="fas fa-angle-left me-3"></i>
                Voltar para carro de compras
              </button>
            </Link>

            <div style={{flex: 'auto'}} onClick={finishStep}>
              <button className="btn btn-primary form-control mt-4 ms-2 p-2 shadow">
                Prosseguir para envio
                <i class="fas fa-angle-right ms-3"></i>
              </button>
            </div>
          </div>
        </>
      : <Redirect to={"/checkout/shipping"} />

  )
}