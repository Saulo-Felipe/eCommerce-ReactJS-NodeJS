import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'
import './CartPreview.css'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux' 
import { selectCart } from '../../../store/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { changeCartValue, changePrice } from '../../../store/slices/cartSlice'

export default function CartPreview() {
    const { cartValue, totalPrice } = useSelector(selectCart)
    const [isLogged, setIsLogged] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        (async() => {
            var user = await isAuthenticated()
            setIsLogged(user)
            if (user !== null) {
                var { data } = await api.post('cart-products', { userID: user.id })

                if (data.error) return alert('Erro ao listar produtos do carrinho.')

                dispatch(changeCartValue(data.result))

                var amountCart = 0
                for (var c=0; c < data.result.length; c++) {
                    amountCart += Number(data.result[c].price)
                }
                dispatch(changePrice(amountCart.toFixed(2)))
            }
        })();
    }, [])


    return (
        <div className="preview-cart-container">
            <div className="m-2 mt-0">Seus Produtos estão salvos aqui :)</div>
            <div className="preview-allproducts">   
                {
                    cartValue.map(item => 
                        <div className="preview-product" key={item.id}>
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
            
            {
                Number(totalPrice) !== 0
                ? <div className="pt-4">
                    <div className="preview-footer-content">
                        <div>
                            <div><span className="text-secondary">Subtotal: </span>R${totalPrice}</div> 
                        </div>
                        <div 
                            data-bs-toggle={isLogged ? "modal" : ""} 
                            data-bs-target={isLogged ? "#staticBackdrop" : ""}
                        >
                            <Link to={isLogged ? "/my-shopping-cart" : "#"} className="no-href-decoration" >
                                <div className="preview-expand-cart">Expandir Carrinho <i className="fas fa-chevron-right"></i></div>
                            </Link>
                        </div>   
                    </div>
                    <Link to="/checkout/address" className="no-href-decoration">
                        <button className="btn btn-primary form-control"><i className="fas fa-cart-arrow-down"></i> Finalizar Compras</button>
                    </Link>
                </div>
                : <div>Para começar, adicione algum produto ao carrinho!</div>
            }


        </div>
    )

}