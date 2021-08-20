import React, { useState, useEffect } from 'react'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'
import './CartPreview.css'

export default function CartPreview() {
    const [cart, setCart] = useState([])

    useEffect(() => {
        (async() => {
            var user = await isAuthenticated()
            if (user !== null) {
                var { data } = await api.post('cart-products', { userID: user.id })

                
                if (data.error) return alert('Erro ao listar produtos do carrinho.')
    
                setCart(data.result)
            }

        })();
    }, [])


    return (
        <div className="preview-cart-container">
            <div>Seu Carrinho</div>
            <div className="preview-allproducts">   
                {
                    cart.map(item => 
                        <div className="preview-product">
                            <div className="preview-image-container">
                                <img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${item.cover}/${item.id}/product`} alt="cover" />
                            </div>
                            <div className="preview-content-container ps-2">
                                <div>{item.product_name}</div>
                                <div>R${item.price}</div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="pt-4">
                <div className="preview-footer-content">
                    <div>
                        <div><span className="text-secondary">Subtotal: </span>$89.90</div> 
                    </div>
                    <div>
                        <div className="preview-expand-cart">Expandir Carrinho <i class="fas fa-chevron-right"></i></div>
                    </div>   
                </div>
                <button className="btn btn-primary form-control">Finalizar Compras</button>
            </div>
        </div>
    )

}