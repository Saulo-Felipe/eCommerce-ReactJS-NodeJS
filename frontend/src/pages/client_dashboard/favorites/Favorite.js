import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { isAuthenticated } from '../../../services/isAuthenticated'
import { like, useLike } from '../../../components/context/Likes'

export default function Favorite(props) {
  const [FavoriteProducts, setFavoriteProducts] = useState([])
  const { like, setLike } = useLike()
  const [loading, setLoading] = useState([])
  const [loadingLikes, setLoadingLikes] = useState([])

  useEffect(() => {


    props.hooks.setConfigs({
      PagePosition: 'Favoritos',
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
      var isLogged = await isAuthenticated()
      setLoadingLikes(<div className="text-center mt-5"><div className="spinner-border mx-auto" role="status"><span className="visually-hidden">Loading...</span></div></div>)
      const response = await api.post('/likes', { id: isLogged.id, type: 'get all likes' })
      setLoadingLikes()

      setFavoriteProducts(response.data.result)

    })();
  }, [])

  async function removeFavorite(id) {
    var isLogged = await isAuthenticated()

    setLoading(<span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>)
    var btnRemove = document.querySelectorAll('.btn-remove-favorite')
    for (var c=0; c < btnRemove.length; c++)
      btnRemove[c].setAttribute('disabled', 'disabled')

    const response = await api.post('/new-like', { type: 'dislike', idUser: isLogged.id, idProduct: id })
    if (response.data.error) return alert('Error ao deslike. Tente novamente mais tarde ou entre em contato com o suporte')

    var res = await api.post('/likes', { id: isLogged.id, type: 'get all likes' })
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
        FavoriteProducts && FavoriteProducts.length === 0 
        ? <h1>Nenhum Produto Salvo</h1>
        : FavoriteProducts.map((product) => 
          <div className="card-line d-flex mb-3" key={product.id}>
            <div className="card-line-image" style={{backgroundImage: `url(${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${product.cover}/${product.id}/product)`}}>
            </div>
            <div className="card-line-content">
              <div className="mini-title-products">{product.product_name}</div>
              <div className="d-flex">
                <div className="option-category-favorite">Categorias: </div>
                <div className="result-category-favorite d-flex"> 
                  {
                    product.categories 
                    ? product.categories.length === 0 ?
                      <div className="categorie-of-favorite-product ms-1"> Nenhuma categoria cadastrada</div> :
                      product.categories.map((item) => <div className="categorie-of-favorite-product ms-1"><a href="/" className="me-2 text-decoration-none"> {item} </a></div> )
                    : ""
                  }
                </div>
              </div>
              <div className="">
                <span className="option-category-favorite">Descrição: </span>
                <small className="">{product.description}</small>
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
      {loadingLikes}
    </div>
	)
}