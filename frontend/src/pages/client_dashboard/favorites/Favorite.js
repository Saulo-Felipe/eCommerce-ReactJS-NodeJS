import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'

export default function Favorite(props) {
  const [FavoriteProducts, setFavoriteProducts] = useState([])

  useEffect(() => {
    props.hooks.setConfigs({
      PagePosigion: 'Favoritos',
      TitleOne: 'Favoritos',
      TitleTwo: 'Lista de Produtos salvos: '
    })

    // ==========| Active color on actual page |==========
    var icons = document.querySelectorAll('.icon-dashboard')
    for (var c=0; c < icons.length; c++) {
      icons[c].classList.remove('active-here')
    }
    document.querySelector('.alternative-icon-favorite').classList.add('active-here')
    document.querySelector('.alternative-title-favorite').classList.add('active-here');
    // ==========| Active color on actual page |==========
    

    (async() => {
      const response = await api.post('/likes', { id: isAuthenticated, type: 'get all likes' })

      setFavoriteProducts(response.data.result)
    })()
  }, [])

	return (
		<div className="favorite-content ms-4">
      {
        FavoriteProducts.length === 0 
        ? <h1>Nenhum Produto Salvo</h1>
        : FavoriteProducts.map((product) => 
          <div className="card-line d-flex mb-3">
            <div className="card-line-image" style={{backgroundImage: `url(${require(`../../../coversProduct/${product.cover}`).default})`}}>
            </div>
            <div className="card-line-content">
              <div className="mini-title-products">{product.product_name}</div>
              <div>
                <span className="option-category-favorite">Categorias:</span>
                <span className="result-category-favorite"> notebooks, informatica, celulares</span>
              </div>
              <div>
                <span className="option-category-favorite">Cores:</span>
                <span className="result-category-favorite"> Azul, Vermelho, Verde</span>
              </div>
              <div className="mini-price-products">R$ {product.price}</div>
            </div>
            <div className="remove-container">
              <button className="btn btn-outline-danger btn-remove-favorite">
                <div className="material-icons remove-favorite-icon">delete_forever</div>
                <div className="remove-favorite-txt">Remover</div>
              </button>
            </div>
          </div>
        )
      }
    </div>
	)
}