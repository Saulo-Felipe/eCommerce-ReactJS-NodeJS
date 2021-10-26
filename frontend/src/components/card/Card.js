import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './S-Card.css'
import api from '../../services/api'
import { isAuthenticated } from '../../services/isAuthenticated'

import { useDispatch, useSelector } from 'react-redux'
import { changeLikeCount } from '../../store/slices/likeSlice'
import { changeCartCount, changeCartValue, changePrice } from '../../store/slices/cartSlice'
import { selectLike } from '../../store/slices/likeSlice'
import { selectCart } from '../../store/slices/cartSlice'

export default function Card(props) {

  const dispatch = useDispatch()
  const { likeCount } = useSelector(selectLike)
  const { cartCount } = useSelector(selectCart)

  const [likeIcon, setLikeIcon] = useState()
  const [rating, setRating] = useState(0)
  const [stars, setStars] = useState([])
  const [isLogged, setIsLogged] = useState({id: null})
  const [insideCartBtn, setInsideCartBtn] = useState(<div className="product-add-card"><i className="fas fa-cart-plus"></i>Adicione ao Carrinho</div>)


  useEffect(() => {

    (async () => {
      var idUser = await isAuthenticated()

      setIsLogged(idUser)

      if (idUser !== null) {
        insideTheCart(idUser.id, props.id) // verify inside the cart

        var response = await api.post('/likes', { idUser: idUser.id, idProduct: props.id })

        if (response.data.like === true)
          setLikeIcon(<span className="material-icons-outlined text-red">favorite</span>)
        else
          setLikeIcon(<span className="material-icons-outlined ">favorite_border</span>)
      } 
      else
        setLikeIcon(<span className="material-icons-outlined ">favorite_border</span>)

      // Get rating
      var ratingCard = await api.post('/rating', { productID: props.id })

      if (ratingCard.data.error) return alert('Erro ao buscar avaliações')

      setRating(ratingCard.data.result.length)

      var countRating = 0

      for (var count=0; count < ratingCard.data.result.length; count++) {
        countRating += ratingCard.data.result[count].rating
      }
      
      countRating = countRating / ratingCard.data.result.length

      var mapRating = []
      for (var c=0; c < 5; c++) {
        if (c + 0.5 < countRating) {
          mapRating = [...mapRating, <span key={c} className="material-icons-outlined star">star</span>]
        } else {
          mapRating = [...mapRating, <span key={c} className="material-icons-outlined star">star_border</span>]
        }
      }

      setStars(mapRating)

    })();
  }, [])

  async function LikeOrDeslike() {
    const user = await isAuthenticated()

    if (user === null) {
      alert("Você precisa estar logado para dar like em produtos.")

    } else {
      var response = await api.post('/likes', { idUser: isLogged.id, idProduct: props.id })

      if (response.data.like === false) {
        await api.post('/new-like', { idUser: isLogged.id, idProduct: props.id, type: 'like' })
        setLikeIcon(<span className="material-icons-outlined text-red">favorite</span>)
        dispatch(changeLikeCount(likeCount+1))
      } else {
        await api.post('/new-like', { idUser: isLogged.id, idProduct: props.id, type: 'dislike' })
        setLikeIcon(<span className="material-icons-outlined">favorite_border</span>)
        dispatch(changeLikeCount(likeCount-1))
      }
    }
  }

  async function AddToCart() {
    const user = await isAuthenticated()
    if (user === null) return alert("Você precisa está logado para adicionar itens ao carrinho.")
    //Loading
    setInsideCartBtn(
      <div  className="product-add-card bg-warning" disabled>
        <i className="fas fa-cart-plus"></i>Carregando...
        <div className="m-0 ms-3 spinner-border text-primary spinner-border-sm" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )

    var verify = await api.post('/verify-product-cart', { userID: user.id, productID: props.id })

    if (verify.data.inside === true) {
      var response = await api.post('/remove-cart-product', { productID: props.id, userID: user.id })
      if (response.data.error) return alert('Erro ao remover produto no carrinho.')
      setInsideCartBtn(<div className="product-add-card"><i className="fas fa-cart-plus"></i>Adicione ao Carrinho</div>)
      dispatch(changeCartCount(cartCount-1))
    }
    
    else {
      var response = await api.post('/new-cart-product', { productID: props.id, userID: user.id })
      if (response.data.error) return alert('Erro ao inserir produto no carrinho.')
      setInsideCartBtn(<div className="product-add-card bg-danger"><i className="fas fa-cart-plus"></i>Remover do Carrinho</div>)       
      dispatch(changeCartCount(cartCount+1))
    };

    // update cart preview
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
  }


  async function insideTheCart(idUser, idProduct) {
    var isInside = await api.post('/verify-product-cart', { userID: idUser, productID: idProduct })

    if (isInside.data.error) return alert('Erro ao verificar se item está no carrinho.')

    if (isInside.data.inside === true)
      setInsideCartBtn(<div className="product-add-card bg-danger"><i className="fas fa-cart-plus"></i>Remover do Carrinho</div>) 

    else
      setInsideCartBtn(<div className="product-add-card"><i className="fas fa-cart-plus"></i>Adicione ao Carrinho</div>)
  }

  function actualDate() {
    var data = new Date()
    var dia = String(data.getDate()).padStart(2, '0')
    var mes = String(data.getMonth() + 1).padStart(2, '0')
    var ano = data.getFullYear()
    return ano + '-' + mes + '-' + dia      
  }
  
  function difference(createdAt) {
    var currentDate = new Date(actualDate())
    createdAt = new Date(createdAt)
    const date1utc = Date.UTC(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());
    const date2utc = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    var day = 1000*60*60*24;
    if ((date2utc - date1utc) / day <= 7)
      return true
    else 
      return false
  }
    
  var isNew = difference(props.createdAt)

  return (
    <div className="primaryCard">
      {
        props.isAdmin === true ? <Link to={`/admin/product/edit/${props.id}/${props.description}`}><i className="far fa-edit btn-edit-product"></i></Link> : ""
      }
      <div className="product-alerts">
        {
          isNew === true
          ? <div className="product-new">Novo</div>
          : ""
        }
        {
          props.sale === true 
          ? <div className="product-promotion" style={ isNew === true ? {left: '40px'} : {left: '0px'}}>Promoção</div>
          : ""
        }
        
      </div>
      
      <div className="heartLike" onClick={() => LikeOrDeslike()} data-bs-toggle={isLogged ? "" : "modal"} data-bs-target={isLogged ? "" : "#staticBackdrop"}>{likeIcon}</div>
      
      <Link to={`/product/${props.id}/${props.title.replace(/%/g, '-')}`} className="no-href-decoration">
      
        <div className="secondayCard">
          
          <div className="product-image">
            <div className="product-cover" style={{backgroundImage: `url(${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${props.cover}/${props.id}/product)`}}>
              
            </div>
          </div>
          
          <hr className="m-0" />

          <div className="product-content">
            <small className="product-old-price text-decoration-line-through text-secondary" 
              style={props.oldPrice !== 0 ? {opacity: 1} : {opacity: 0}} >
              R${props.oldPrice}
            </small>
            <div className="product-title">{props.title}</div>
            <div className="product-price fw-light">R${props.price}</div>

            <div className="product-stars mt-2">
              <span>{stars.map(item => item)}</span>
              <span className="product-amount-rating">{rating} {rating < 2 ? "Avaliação" : "Avaliações"}</span>
            </div>
          </div>
          
        </div>
      </Link>
      <div onClick={() => AddToCart()} data-bs-toggle={isLogged ? "" : "modal"} data-bs-target={isLogged ? "" : "#staticBackdrop"}>{ insideCartBtn }</div>
    </div>
  )
}
