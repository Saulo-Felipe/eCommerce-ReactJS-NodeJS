import React, { useState, useEffect } from 'react'
import './S-AddProduct.css'
import logoReact from './react-logo.png'

export default function AddProduct() {

  function handleChangeFom(values) {
    var InputValue = values.target.value
    var InputID = values.target.id

    console.log(InputValue, InputID)
  }

  return (
    <>
      <div className="container mt-3 mb-5">
        <div className="newProduct">
          <div className="logo-form-AddProduct">
            <img src={logoReact} height="200px" />
          </div>
          <div className="form-controler">
            <label htmlFor="name">Nome do Produto</label>
            <input id="name" className="formProduct form-control inputValid" onChange={handleChangeFom} required/>

            <div className="validation-form d-flex flex-box mt-2">
              <div className="validade me-2">
                <label htmlFor="amountProduct">Quantidade do Produto: </label>
                <input type="number" className="form-control inputValid" required pattern="[1-99999]+$" />
              </div>
              <div className="validade">
                <label htmlFor="amountProduct">Capa do produto: </label>
                <input type="file" className="form-control inputValid" required />
              </div>
            </div>

            <label htmlFor="descriptionProduct" className="mt-2">Descrição do produto: </label>
            <textarea id="descriptionProduct" className="form-control inputValid" required></textarea>

            <label htmlFor="multipleImages" className="mt-2">Imagens do produto: </label>
            <input type="file" id="multipleImages inputValid" className="form-control" multiple required/>
            <small className="obs">*Você pode selecionar mais de uma imagem</small>


            <label htmlFor="price" className="mt-2">Preço do produto: </label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">R$</span>
              <input type="number" className="form-control inputValid" id="price" min="0" required aria-describedby="basic-addon1"></input>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
