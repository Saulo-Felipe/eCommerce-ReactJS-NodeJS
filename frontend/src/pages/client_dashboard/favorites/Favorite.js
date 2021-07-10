import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'
import { useLike } from '../../../components/context/Likes'

export default function Favorite(props) {
  const [FavoriteProducts, setFavoriteProducts] = useState([])
  const { like, setLike } = useLike()
  const [loading, setLoading] = useState()

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
    document.querySelectorAll('.alternative-icon-favorite')[0].classList.add('active-here')
    document.querySelectorAll('.alternative-title-favorite')[0].classList.add('active-here');
    // ==========| Active color on actual page |==========
    
    (async() => {
      const response = await api.post('/likes', { id: isAuthenticated, type: 'get all likes' })

      setFavoriteProducts(response.data.result)
    })();
  }, [])

  async function removeFavorite(id) {

    setLoading(<span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>)
    var btnRemove = document.querySelectorAll('.btn-remove-favorite')
    for (var c=0; c < btnRemove.length; c++)
      btnRemove[c].setAttribute('disabled', 'disabled')

    const response = await api.post('/new-like', { type: 'dislike', idUser: isAuthenticated, idProduct: id })
    if (response.data.error) return alert('Error ao deslike. Tente novamente mais tarde ou entre em contato com o suporte')

    var res = await api.post('/likes', { id: isAuthenticated, type: 'get all likes' })
    if (res.data.error) return alert('Erro interno ao listar likes, tente novamente mais tarde.')
    
    setLoading()
    for (var count=0; count < btnRemove.length; count++)
      btnRemove[count].removeAttribute('disabled')


    setFavoriteProducts(res.data.result)
    setLike(like-1)
  }

	return (
		<div className="favorite-content ms-4">
      {
        FavoriteProducts.length === 0 
        ? <h1>Nenhum Produto Salvo</h1>
        : FavoriteProducts.map((product) => 
          <div className="card-line d-flex mb-3" key={product.id}>
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
              <button className="btn btn-outline-danger btn-remove-favorite" onClick={() => removeFavorite(product.id)}>
                <div className="material-icons remove-favorite-icon">delete_forever</div>
                <div className="remove-favorite-txt">Remover</div>
                {loading}
              </button>
            </div>
          </div>
        )
      }
    </div>
	)
}