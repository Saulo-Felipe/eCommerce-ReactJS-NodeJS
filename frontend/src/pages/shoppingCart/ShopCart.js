import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './S-ShopCart.css'
import api from '../../services/api'
import { isAuthenticated } from '../../services/isAuthenticated'

import { useSelector, useDispatch } from 'react-redux'
import { changeCartCount, changeCartValue } from '../../store/slices/cartSlice'
import { selectCart } from '../../store/slices/cartSlice'


export default  function ShoptCart() {

	const dispatch = useDispatch()
	const { cartCount } = useSelector(selectCart)

	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState()
	const [amount, setAmount] = useState(0)

	async function refreshCart() {
		setLoading(<div className="text-center"><img height="100px" src={require("../../images/Infinity-loading.gif").default} alt="loading..." /></div>)

		var user = await isAuthenticated()
		if (user === null) return alert('Usuario não autenticado') 

		var response = await api.post('cart-products', { userID: user.id })

		setLoading()

		if (response.data.error) return alert('Erro ao buscar produtos do carrinho.')

		var value = 0
		for (var c=0; c < response.data.result.length; c++) {
			value += Number(response.data.result[c].price)
		}
		setAmount(value)

		dispatch(changeCartValue(response.data.result))

		setProducts(response.data.result)	
		
		var fixImageSize = document.querySelectorAll(".card-cart-image img")

		for (var image of fixImageSize) {
			if (image.width > image.height) {
				image.style.width = "100%"
				image.style.height = "auto"
			} else {
				image.style.width = "auto"
				image.style.height = "100%"
			}

		}

	}

	useEffect(() => {
		window.scrollTo(0, 0)

		refreshCart()

		var scrollToTopElement = document.querySelector('.go-to-top-cart')

		document.addEventListener('scroll', () => {
			if (window.pageYOffset > 1000) {
				scrollToTopElement.style.left = "97%"
			} else {
				scrollToTopElement.style.left = "110%"
			}
		})

		scrollToTopElement.addEventListener('click', () => {
			window.scrollTo(0, 0)
		})

	}, [])

	async function removeToCart(productID) {
		setLoading(<div className="text-center"><img height="100px" src={require("../../images/Infinity-loading.gif").default} alt="loading..." /></div>)
		var allRemoveBtns = document.querySelectorAll('.cart-remove-product')

		allRemoveBtns.forEach((item) => { item.setAttribute('disabled', 'disabled') })

		var user = await isAuthenticated()

		var response = await api.post('/remove-cart-product', { userID: user.id, productID })

		setLoading()

		if (response.data.error) return alert('Erro ao remover produto do carrinho!')

		dispatch(changeCartCount(cartCount-1))
		refreshCart()
		allRemoveBtns.forEach((item) => { item.removeAttribute('disabled') })
	}

	return (
	
		<div className="bg-white pb-5">
			
			<div className="page-cart-top d-flex">
			 	<div className="w-100 page-cart-top-itens">
					<h4>Seu Carrinho de compras</h4>
					<h5>Produtos: </h5>
				</div>
				<small className="w-100 text-end">Home <i className="fas fa-chevron-right"></i> Loja <i className="fas fa-chevron-right"></i> Carrinho</small>
			</div>

			<div className="page-cart-content d-flex">
				<div className="page-cart-products ms-3 mt-2">
					{loading}

					{
						products.length === 0 ? <h1>Nenhum Produto no seu carrinho</h1> 
						: products.map((item) => 
							<div className="border card-cart-product d-flex mt-2" key={item.id}>
								<div className="d-flex h-100">
									<div className="card-cart-image">
										<img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${item.cover}/${item.id}/product`} alt="cover" />
									</div>
									<div className="ms-3">
										<div className="fw-light fs-5 card-cart-name">
											<Link 
												to={`/product/${item.id}/${item.product_name.replace(/%/g, '-')}`}
												className="no-href-decoration"
											>
												{ item.product_name }
											</Link>
										</div>
										<small className="text-secondary card-cart-description">{ item.description }</small>
										<div className="fw-bolder fs-5 card-cart-price">R${ item.price }</div>
									</div>
								</div>

								<div className="d-flex config-product-cart" style={{ alignItems: 'center' }}>
									<div className="card-cart-amount-container me-3 transform-X">
									  <div className="mb-1">Quantidade: </div>
										<input className="form-control card-cart-product-amount" defaultValue="1" type="number" />
										<button className="cart-remove-product mt-1 btn btn-outline-danger d-flex" onClick={() => {removeToCart(item.id)}}><span className="material-icons-outlined">delete</span> Remover</button>
									</div>
								</div>
							</div>
						)
					}

				

				</div>

				<div className="page-cart-checkout p-3"> 
					<h4 className="mt-3 page-cart-subtotal text-center">Subtotal</h4>
					<div className="fs-3 text-center fw-light mt-2">R${amount}</div>

					<hr className="m-5 mt-4"/>

					<div className="card mb-3 small-information">
						<div className="card-body">
							<i className="fas fa-shipping-fast me-3"></i>
							Chega em 15 dias
							<i className="fas fa-boxes ms-3"></i>
						</div>
					</div>

					<div className="card mb-3 small-information">
						<div className="card-body">
							<i className="fas fa-hand-holding-usd me-2"></i>
							Frete Grátis para compras acimas de R$200
						</div>
					</div>

					<div>
						<button className="mt-4 p-2 btn btn-outline-primary form-control checkout-finish"><span className="material-icons-outlined">credit_card</span> Finalizar Compra</button>
					</div>

					<div className="text-end text-primary mt-5" data-bs-toggle="modal" data-bs-target="#getCep">Calcular valor de entrega</div>
				</div>
			</div>


			<div className="modal fade" id="getCep" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="removeCep" aria-hidden="true">
			  <div className="modal-dialog">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="removeCep">Modal title</h5>
			        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div className="modal-body getCep-body">

					<div>
						<span className="badge bg-warning text-dark mb-2">Calcule seu Frete</span>
						<div>
							<input 
								type="text" 
								className="form-control mb-2" 
								placeholder="Coloque seu CEP aqui"
							/>
							<button className="btn btn-success p-1">Calcular usando CEP</button>
						</div>
					</div>

			      </div>
			    </div>
			  </div>
			</div>

			<div className="go-to-top-cart">
				<i className="fas fa-chevron-up"></i>
			</div>	

		</div>

	)
}