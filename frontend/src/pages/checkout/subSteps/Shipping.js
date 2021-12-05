import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { changeColorsOfSteps } from '../Checkout'
import './S-SubStep.css'

import { changeAddress, selectAddress } from '../../../store/slices/checkoutSlice'
import { useDispatch, useSelector } from 'react-redux'


export default function Shipping() {

  const [shippingOptions, setShippingOptions] = useState([
    
    {
      title: "BR Transports [Padrão]",
      subTitle: "Envio para todo o Brasil (+ taxa por região)",
      delivaryTime: "15-20 dias",
      price: "25",
    },
    {
      title: "[Região] Nordeste",
      subTitle: "Envio unicamente para cidades nordertinas",
      delivaryTime: "10 dias",
      price: "66,89",
    },
    {
      title: "[Região] Norte e Centro-Oest",
      subTitle: "Não inclui os estados: Amapá, Rondônia",
      delivaryTime: "12 dias",
      price: "59,99",
    },
    {
      title: "Retirar da Loja",
      subTitle: "Retire seu produto em uma das nossas Lojas",
      delivaryTime: "1 dia",
      price: "0,00 (Grátis)",
    },
    {
      title: "[Região] Sul",
      subTitle: "Envio para todos os estados do Sul",
      delivaryTime: "9-11 dias",
      price: "59,99",
    },

  ])

  const dispatch = useDispatch()
  const { address } = useSelector(selectAddress)

  function handleChangeInput() {

    var allRadioInputs = document.querySelectorAll('.select-shipping-card input')
    
    for (var count in allRadioInputs) {
      if (allRadioInputs[count].checked === true) {
        var selectedCard = document.querySelector(`#root > div.checkout-content > div.checkout-content-page > div > div:nth-child(${Number(count)+2})`)
        var splitedString = selectedCard.innerText.split('\n')

        dispatch(changeAddress([{...address}, {
          title: splitedString[0],
          subTitle: splitedString[1],
          delivaryTime: splitedString[2],
          price: splitedString[3] 
        }]))

      }
    }
  }

  useEffect(() => {
    handleChangeInput()
    changeColorsOfSteps(3)
  }, [])

  return (
    <>
      <h5 className="mt-4 mb-3">Escolha um método de envio</h5>
      <div className="shipping-container">
        
        <div className="d-flex pt-3 pb-3 fw-bolder">
          <div className="select-shipping-type"></div>
          <div className="shipping-card-title">Método de envio</div>
          <div className="shipping-card-time">Tempo de entrega</div>
          <div className="shipping-card-price">Custo de envio (FRETE)</div>
        </div>

        {
          shippingOptions.map(item => 
            <div className="select-shipping-card">
              <div className="select-shipping-type">
                {
                  item.price === "25"
                  ? <input type="radio" name="inlineRadioOptions" defaultChecked className="form-check-input" onChange={(changes) => handleChangeInput(changes.target)}/>
                  : <input type="radio" name="inlineRadioOptions" className="form-check-input" onChange={(changes) => handleChangeInput(changes.target)}/>
                }
              </div>
              
              <div className="shipping-card-title">
                <div className="fw-bolder">{item.title}</div>
                <div className="shipping-subTitle-card">{item.subTitle}</div>
              </div>
              
              <div className="shipping-card-time">{item.delivaryTime}</div>
              <div className="shipping-card-price">R$ {item.price}</div>
            </div>
          )
        }

        <div className="d-flex mb-5 mt-5">
            <Link style={{flex: 'auto'}} to={"/checkout/address"} className="no-href-decoration w-auto">
              <button className="btn btn-secondary form-control mt-4 me-2 p-2 shadow">
                <i class="fas fa-angle-left me-3"></i>
                Voltar para carro de compras
              </button>
            </Link>

            <Link to={"/checkout/pay"} style={{flex: 'auto'}} >
              <button className="btn btn-primary form-control mt-4 ms-2 p-2 shadow">
                Prosseguir para pagamento
                <i class="fas fa-angle-right ms-3"></i>
              </button>
            </Link>
          </div>

      </div>
    </>
  )
}