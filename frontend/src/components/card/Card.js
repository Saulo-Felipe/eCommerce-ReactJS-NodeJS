import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './S-Card.css'
import api from '../../services/api'
import { useLike } from '../context/Likes'
import { isAuthenticated } from '../../services/isAuthenticated'
import { Toast } from '../context/Toast'

export default function Card(props) {

  const [likeIcon, setLikeIcon] = useState()
  const { like, setLike } = useLike()
  const [logs, setLogs] = useState()
  const [rating, setRating] = useState(0)
  const [stars, setStars] = useState([])

  useEffect(() => {
    (async () => {
      var idUser = await isAuthenticated()

      if (idUser != null) {
        var response = await api.post('/likes', { idUser: idUser.id, idProduct: props.id })

        if (response.data.like === true) {
          setLikeIcon(<span className="material-icons-outlined text-red">favorite</span>)
        } else {
          setLikeIcon(<span className="material-icons-outlined ">favorite_border</span>)
        }
      } else {
        setLikeIcon(<span className="material-icons-outlined ">favorite_border</span>)
      }

    // Get rating
      var ratingCard = await api.post('/rating', { productID: props.id })

      if (ratingCard.data.error) return alert('Erro ao buscar avaliações')
      console.log('Card avaliação: ', ratingCard.data.result)

      setRating(ratingCard.data.result.length)

      var countRating = 0
      for (var count=0; count < ratingCard.data.result.length; count++) {
        countRating += ratingCard.data.result[count].rating
      }
      countRating = countRating / ratingCard.data.result.length

      var mapRating = []
      for (var c=0; c < 5; c++) {
        if (c < countRating) {
          console.log(`Entrei no preenchido pq: ${c} < ${countRating}`)
          mapRating = [...mapRating, <span className="material-icons-outlined star">star</span>]
        } else {
          console.log(`Entrei no vazio pq: ${c} > ${countRating}`)
          mapRating = [...mapRating, <span className="material-icons-outlined star">star_border</span>]
        }
      }

      setStars(mapRating)

    })()
  }, [])

  async function LikeOrDeslike() {
    var idUser = await isAuthenticated()
    if (idUser === null) {
      alert("Você precisa estar logado para dar like em produtos.")
      setLogs(<Toast title={"Test aqui"} content={"Conteudo aqui tudo certo"}/>)
    } else {
      var response = await api.post('/likes', { idUser: idUser.id, idProduct: props.id })

      if (response.data.like === false) {
        await api.post('/new-like', { idUser: idUser.id, idProduct: props.id, type: 'like' })
        setLikeIcon(<span className="material-icons-outlined text-red">favorite</span>)
        setLike(like+1)
      } else {
        await api.post('/new-like', { idUser: idUser.id, idProduct: props.id, type: 'dislike' })
        setLikeIcon(<span className="material-icons-outlined">favorite_border</span>)
        setLike(like-1)
      }
    }
  }

  return (
    <div className="primaryCard">

      <div className="product-alerts">
        <div className="product-new">Novo</div>
        <div className="product-promotion">Promoção</div>
      </div>

      <div className="heartLike" onClick={() => LikeOrDeslike()}>{likeIcon}</div>

      <Link to={`/product/${props.id}/${props.title.replace(/%/g, '-')}`} className="no-href-decoration">

        <div className="secondayCard">
          
          <div className="product-image">
            <div className="product-cover" style={{backgroundImage: `url(${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${props.cover}/${props.id}/product)`}}>
              
            </div>
          </div>

          <div className="product-content">
            <small className="product-old-price text-decoration-line-through text-secondary">R$199.99</small>
            <div className="product-title">{props.title}</div>
            <div className="product-price fw-light">R${props.price}</div>

            <div className="product-stars mt-2">
              <span>{stars.map(item => item)}</span>
              <span className="product-amount-rating">{rating} {rating < 2 ? "Avaliação" : "Avaliações"}</span>
            </div>
          </div>


        </div>
        <div className="product-add-card"><i class="fas fa-cart-plus"></i>Adicione ao Carrinho</div>
      </Link>
    </div>
  )
}
