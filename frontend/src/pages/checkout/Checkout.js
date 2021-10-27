import React, { useEffect, useState } from 'react'
import { Route, Switch, Link, Redirect, useLocation, useParams } from 'react-router-dom'
import './S-Checkout.css'
import { isAuthenticated } from '../../services/isAuthenticated'
import api from '../../services/api'


export default function Checkout() {
	const [products, setProducts] = useState([])







  useEffect(() => {
    (async() => {
      var user = await isAuthenticated()
      var response = await api.post('cart-products', { userID: user.id })

      if (response.data.error) return alert("Erro ao tentar obter dados.")

      setProducts(response.data.result)

    })();
  }, [])







  const currentURL = window.location.href
  const allowedURLs = ['address', 'shipping', 'pay', 'review']
  let urlValid = false

  const id = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    console.log("ID: ", id)
  }, [pathname])

  for (var url of allowedURLs) {
    if (currentURL.indexOf(url) !== -1) {
      urlValid = true
    }
  }

  if (urlValid === false) {
    return <Redirect to={"/checkout/address/2"} />
  }


  return (
    <>
      <div id="header-checkout">
        <h1>Finalizar Compra</h1>

        <div class="steps">

            <div class="step">
              <Link to="/my-shopping-cart" className="no-href-decoration">
                <div class="steps-line"></div>

                <div class="steps-content">1</div>
                <div class="step-icons">
                  <i class="fas fa-shopping-cart"></i>
                  Carrinho
                </div>
              </Link>
            </div>

          <div class="step">
            <Link to="/checkout/address" className="no-href-decoration">
              <div class="steps-line"></div>

              <div class="steps-content">2</div>
              <div class="step-icons">
                <i class="fas fa-map-marked-alt"></i>
                Endereço
              </div>
            </Link>
          </div>

          <div class="step">
            <Link to="/checkout/shipping" className="no-href-decoration">
              <div class="steps-line"></div>

              <div class="steps-content">3</div>
              <div class="step-icons">
                <i class="fas fa-shipping-fast"></i>
                Metodo de Envio
              </div>
            </Link>
          </div>


          <div class="step">
            <Link to="/checkout/pay" className="no-href-decoration">
              <div class="steps-line"></div>

              <div class="steps-content">4</div>
              <div class="step-icons">
                <i class="far fa-credit-card"></i>
                Pagamento
              </div>
            </Link>
          </div>


          <div class="step">
            <Link to="/checkout/review" className="no-href-decoration">
              <div class="steps-line"></div>

              <div class="steps-content">5</div>
              <div class="step-icons">
                <i class="fas fa-check"></i>
                Revisão
              </div>
            </Link>
          </div>


        </div>

      </div>

      <div class="checkout-content">
        <div class="checkout-content-page">
          <Switch>
            <Route path="/checkout/address/" component={Adress}/>
            <Route path="/checkout/shipping/" component={Shipping}/>
            <Route path="/checkout/pay/" component={Pay}/>
            <Route path="/checkout/review/" component={Review}/>
          </Switch>
        </div>

        <div class="order-summary">
          <h3 className="text-center m-3">Resumo da compra</h3>

          {
            products.length === 0 
            ? <h3>Você não possui nenhum produto no carrinho</h3>
            : products.map((item) => <>
              <div class="product-card-container">
                <div class="product-image-summary">
                  <img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${item.cover}/${item.id}/product`} alt="summary-image-product"></img>
                </div>

                <div className="product-coontent-summary">
                  <div className="fw-bolder">{item.product_name}</div>
                  <div style={{color: 'darkblue'}}>R$ {item.price} x1</div>
                </div>

                <div className="checkout-remove-product pe-2">
                  <i class="fas fa-trash-alt"></i>
                </div>
              </div>
              <hr className="checkout-product-division"/>
              </>
            )
          }

          <div>Testos e informações acerca aqui</div>
        </div>
  
    </div>

    </>
  )
}


function changeColorsOfSteps(maxSize) {
  var allLines = document.querySelectorAll(".steps-line")
  var allCountStep = document.querySelectorAll('.steps-content')
  
  var allIcons = document.querySelectorAll('.step-icons')

  for (var c=0; c < 5; c++) {
    allIcons[c].style.opacity = '0.6'

    if (c <= maxSize-1) {
      allLines[c].classList.add('steps-line-active')
      allCountStep[c].classList.add('steps-content-active')
    } else {
      allLines[c].classList.remove('steps-line-active')        
      allCountStep[c].classList.remove('steps-content-active')
    }
  }
  allIcons[maxSize-1].style.opacity = '1'
}

function Adress() {

  useEffect(() => {
    changeColorsOfSteps(2)
  }, [])

  return (
    <h1>Endereços aqui</h1>
  )
}
function Shipping() {
  useEffect(() => {
    changeColorsOfSteps(3)
  }, [])
  return (
    <h1>entrega aqui</h1>
  )
}
function Pay() {

  useEffect(() => {
    changeColorsOfSteps(4)
  }, [])

  return (
    <h1>pagamento aqui</h1>
  )
}
function Review() {

  useEffect(() => {
    changeColorsOfSteps(5)
  }, [])

  return (
    <h1>veriricar aqui</h1>
  )
}
