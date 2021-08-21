import React, { useState, useEffect } from 'react'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'
import './CartPreview.css'
import { Link } from 'react-router-dom'

export default function CartPreview() {
    const [cart, setCart] = useState([])
    const [totalCart, setTotalCart] = useState(0)

    useEffect(() => {
        (async() => {
            var user = await isAuthenticated()
            if (user !== null) {
                var { data } = await api.post('cart-products', { userID: user.id })
                
                if (data.error) return alert('Erro ao listar produtos do carrinho.')
    
                setCart(data.result)

                var amountCart = 0
                for (var c=0; c < data.result.length; c++) {
                    amountCart += Number(data.result[c].price)
                }
                setTotalCart(amountCart.toFixed(2))
            }

        })();
    }, [])


    return (
        <div className="preview-cart-container">
            <div className="m-2 mt-0">Seus Produtos estão salvos aqui :)</div>
            <div className="preview-allproducts">   
                {
                    cart.map(item => 
                        <div className="preview-product">
                            <div className="preview-image-container">
                                <img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${item.cover}/${item.id}/product`} alt="cover" />
                            </div>
                            <div className="preview-content-container ps-2">
                                <Link to={`/product/${item.id}/${item.product_name.replace(/%/g, '-')}`} className="no-href-decoration href-hover">
                                    <div className="fw-light">{item.product_name}</div>
                                </Link>
                                <div>R${item.price}</div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="pt-4">
                <div className="preview-footer-content">
                    <div>
                        <div><span className="text-secondary">Subtotal: </span>R${totalCart}</div> 
                    </div>
                    <div>
                        <Link className="no-href-decoration" to={"/my-shopping-cart"}>
                            <div className="preview-expand-cart">Expandir Carrinho <i class="fas fa-chevron-right"></i></div>
                        </Link>
                    </div>   
                </div>
                <button className="btn btn-primary form-control" data-bs-toggle="modal" data-bs-target="#developmentPage"><i class="fas fa-cart-arrow-down"></i> Finalizar Compras</button>
            </div>
        </div>
    )

}