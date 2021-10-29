import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCartCount, changeCartValue, changePrice, selectCart } from '../../store/slices/cartSlice'
import { Route, Switch, Link, Redirect, useLocation, useParams } from 'react-router-dom'
import './S-Checkout.css'
import { isAuthenticated } from '../../services/isAuthenticated'
import api from '../../services/api'
import Address from './subSteps/Address'
import Pay from './subSteps/Pay'
import Review from './subSteps/Review'
import Shipping from './subSteps/Shipping'


export default function Checkout() {
	const [products, setProducts] = useState([])

  const dispatch = useDispatch()
  const { cartCount, totalPrice } = useSelector(selectCart)


  async function refreshCart() {
    var user = await isAuthenticated()
    var response = await api.post('cart-products', { userID: user.id })

    if (response.data.error) return alert("Erro ao tentar obter dados.")

    setProducts(response.data.result)
    dispatch(changeCartValue(response.data.result))

    var amountCart = 0
    for (var c=0; c < response.data.result.length; c++) {
        amountCart += Number(response.data.result[c].price)
    }
    dispatch(changePrice(amountCart.toFixed(2)))

  }

  useEffect(() => {
    refreshCart()
  }, [])

  // Protect invalid Links
  const currentURL = window.location.href
  const allowedURLs = ['address', 'shipping', 'pay', 'review']
  let urlValid = false

  const id = useParams()

  for (var url of allowedURLs) {
    if (currentURL.indexOf(url) !== -1) {
      urlValid = true
    }
  }

  if (urlValid === false) {
    return <Redirect to={"/checkout/address/2"} />
  }

	async function removeToCart(productID) {
		var user = await isAuthenticated()

		var response = await api.post('/remove-cart-product', { userID: user.id, productID })

		if (response.data.error) return alert('Erro ao remover produto do carrinho!')

		dispatch(changeCartCount(cartCount-1))
    
		refreshCart()
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
            <Route path="/checkout/address/" component={Address}/>
            <Route path="/checkout/shipping/" component={Shipping}/>
            <Route path="/checkout/pay/" component={Pay}/>
            <Route path="/checkout/review/" component={Review}/>
          </Switch>
        </div>

        <div class="order-summary">
          <h3 className="text-center m-3 mb-4">Resumo da compra</h3>
          
          <div className="checkout-product-container">
          {
            products.length === 0 
            ? <h4 className="text-center m-3">Você não possui nenhum produto no carrinho</h4>
            : products.map((item, index) => 
              <>
                <div class="product-card-container" key={index}>
                  <div class="product-image-summary">
                    <img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${item.cover}/${item.id}/product`} alt="summary-image-product"></img>
                  </div>

                  <div className="product-coontent-summary">
                    <div className="fw-bolder">{item.product_name}</div>
                    <div style={{color: 'darkblue'}}>R$ {item.price} x1</div>
                  </div>

                  <div className="checkout-remove-product pe-2">
                    <i class="fas fa-trash-alt" onClick={ () =>  removeToCart(item.id)}></i>
                  </div>
                </div>
                <hr className="checkout-product-division"/>
              </>
            )
          }
          </div>

          <div className="checkout-informations-summary">
          
            <div className="one-information-summary">
              <div>Subtotal: </div>
              <div>R$ {totalPrice} </div>
            </div>

            <div className="one-information-summary">
              <div>Entrega: </div>
              <div>---- </div>
            </div>

            <div className="one-information-summary">
              <div>Taxa de imposto: </div>
              <div>R$0.50 </div>
            </div>

            <div className="one-information-summary">
              <div>Desconto: </div>
              <div>---- </div>
            </div>

          </div>
          
          <hr className="m-3"/>

          <h3 className="text-center mt-4" style={{color: 'darkblue'}}>R$ {totalPrice}</h3>

          <div className="p-3">
            <input className="form-control mt-4" placeholder="Código promocional"/>
            <button className="btn btn-outline-primary form-control mt-3">Aplicar</button>
          </div>

        </div>
  
    </div>

    </>
  )
}

export const changeColorsOfSteps = (maxSize) => {
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
