import React, { useEffect, useState } from 'react'
import './S-Card.css'
import api from '../../services/api'
import { useLike } from '../context/Likes'

export default function Card(props) {

  const [likeIcon, setLikeIcon] = useState()

  const { like, setLike } = useLike()

  useEffect(() => {
    (async () => {
      var idUser = localStorage.getItem('id')
      if (idUser != null) {
        var response = await api.post('/likes', { idUser: idUser, idProduct: props.id })

        if (response.data.like === true) {
          setLikeIcon(<span className="material-icons-outlined text-red">favorite</span>)
        } else {
          setLikeIcon(<span className="material-icons-outlined ">favorite_border</span>)
        }
      } else {
        setLikeIcon(<span className="material-icons-outlined ">favorite_border</span>)
      }
    })()
  }, [props])

  async function LikeOrDeslike() {
    var idUser = localStorage.getItem('id')
    if (idUser === null) {
      alert("Você precisa estar logado para dar like em produtos.")
    } else {
      var response = await api.post('/likes', { idUser: idUser, idProduct: props.id })

      if (response.data.like === false) {
        await api.post('/new-like', { idUser: idUser, idProduct: props.id, type: 'like' })
        setLikeIcon(<span className="material-icons-outlined text-red">favorite</span>)
        setLike(like+1)
      } else {
        await api.post('/new-like', { idUser: idUser, idProduct: props.id, type: 'dislike' })
        setLikeIcon(<span className="material-icons-outlined">favorite_border</span>)
        setLike(like-1)
      }
    }
  }

  return (
    <div className="PrimaryCard ms-2">
      <div className="SecondaryCard">
        <div className="ThirdCard">

          <div className="heartLike" onClick={LikeOrDeslike}>
            {likeIcon}
          </div>

          <div className="imageProduct" style={{backgroundImage: `url(${require(`../../coversProduct/${props.cover}`).default})`}}>
          </div>

          <hr/>
          <div className="contentProduct">
            <span className="oldPrice">R$ 1999</span>
            <div className="titleCard">{props.title}</div>
            <div className="priceCard">R$ {props.price}.<span className="DecimalPrice">00</span></div>
            <span className="subPrice">ou 10x de 24,90</span>
            <div className="d-flex flex-row rating">
              <div className="stars">
                <span className="material-icons-outlined star">star</span>
                <span className="material-icons-outlined star">star</span>
                <span className="material-icons-outlined star">star</span>
                <span className="material-icons-outlined star">star</span>
                <span className="material-icons-outlined star">star_half</span>
              </div>
              <div className="amountRating">4.5mil</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
