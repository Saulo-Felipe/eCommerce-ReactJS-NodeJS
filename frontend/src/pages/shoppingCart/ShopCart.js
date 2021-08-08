import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './S-ShopCart.css'
import api from '../../services/api'
import { isAuthenticated } from '../../services/isAuthenticated'


export default  function ShoptCart() {

	const [products, setProducts] = useState([])
	const [responsiveBtn, setResponsiveBtn] = useState({
		element: <></>,
		isMobile: false
	})

	useEffect(() => {

		if (window.matchMedia("(max-width: 991px)").matches)
			setResponsiveBtn({
				element: <button className="mt-3 btn btn-outline-danger d-flex"><span class="material-icons-outlined">delete</span> Remover</button>,
				isMobile: true
			})
		else 
			setResponsiveBtn({
				element: <button className="cart-remove-product btn btn-outline-danger"><span class="material-icons-outlined">delete</span></button>,
				isMobile: false
			});

		(async() => {
			var user = await isAuthenticated()
			if (user === null) return alert('Usuario não autenticado') 

			var response = await api.post('cart-products', { userID: user.id })

			if (response.data.error) return alert('Erro ao buscar produtos do carrinho.')

			setProducts(response.data.result)

		})();

	}, [])

	return (
	
		<div className="bg-white pb-5">
			
			<div className="page-cart-top d-flex">
			 	<div className="w-100 page-cart-top-itens">
					<h4>Seu Carrinho de compras</h4>
					<h5>Produtos: </h5>
				</div>
				<small className="w-100 text-end">Home <i class="fas fa-chevron-right"></i> Loja <i class="fas fa-chevron-right"></i> Carrinho</small>
			</div>


			<div className="page-cart-content d-flex">
				<div className="page-cart-products ms-3 mt-2">
					

					{
						products.length === 0 ? <h1>Nenhum Produto no seu carrinho</h1> :
						products.map((item) => 
							<div className="border card-cart-product d-flex mt-2">
								<div className="d-flex h-100">
									<div className="card-cart-image">
										<img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${item.cover}/${item.id}/product`} alt="cover" height="100%" />
									</div>
									<div className="ms-3">
										<div className="fw-light fs-5">{ item.product_name }</div>
										<div className="fw-bolder fs-5 card-cart-price">R${ item.price }</div>
									</div>
								</div>

								<div className="d-flex " style={{ alignItems: 'center' }}>
									<div className=" card-cart-amount-container me-3 transform-X">
									    <div className="mb-2">Quantidade: </div>
										<input className="form-control card-cart-product-amount" defaultValue="1" type="number" />
										{
											responsiveBtn.isMobile === true
											? responsiveBtn.element
											: <></>
										}										
									</div>

									{
										responsiveBtn.isMobile === false
										? responsiveBtn.element
										: <></>
									}
								</div>
							</div>
						)
					}


				

				</div>

				<div className="page-cart-checkout p-3"> 
					<h4 className="mt-3 page-cart-subtotal text-center">Subtotal</h4>
					<div className="fs-3 text-center fw-light mt-2">R$299.99</div>

					<hr className="m-5 mt-4"/>

					<div className="card mb-3 small-information">
						<div className="card-body">
							<i class="fas fa-shipping-fast me-3"></i>
							Chega em 15 dias
							<i class="fas fa-boxes ms-3"></i>
						</div>
					</div>

					<div className="card mb-3 small-information">
						<div className="card-body">
							<i class="fas fa-hand-holding-usd me-2"></i>
							Frete Grátis para compras acimas de R$200
						</div>
					</div>

					<div>
						<button className="mt-4 p-2 btn btn-outline-primary form-control checkout-finish"><span class="material-icons-outlined">credit_card</span> Finalizar Compra</button>
					</div>

					<div className="text-end text-primary mt-5" data-bs-toggle="modal" data-bs-target="#getCep">Calcular valor de entrega</div>
				</div>
			</div>


			<div class="modal fade" id="getCep" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeCep" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="removeCep">Modal title</h5>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div class="modal-body getCep-body">

					<div>
						<span class="badge bg-warning text-dark mb-2">Calcule seu Frete</span>
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

		</div>

	)
}