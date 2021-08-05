import React from 'react'
import './S-ShopCart.css'


export default  function ShoptCart() {
	return (
	
		<div className="bg-white">
			
			<div className="page-cart-top d-flex">
			 	<div className="w-100">
					<h4>Seu Carrinho de compras</h4>
					<h5>Produtos</h5>
				</div>
				<small className="w-100 text-end">Home <i class="fas fa-chevron-right"></i> Loja <i class="fas fa-chevron-right"></i> Carrinho</small>
			</div>


			<div className="page-cart-content d-flex">
				<div className="page-cart-products">
					#Produtos aqui
				</div>

				<div className="page-cart-checkout"> 
					<h4 className="page-cart-subtotal text-center">Subtotal</h4>
					<div className="fs-3 text-center fw-light mt-2">R$299.99</div>
				</div>
			</div>

		</div>

	)
}