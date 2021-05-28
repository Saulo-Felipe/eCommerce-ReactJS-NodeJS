import React, { useEffect, useState } from 'react'
import CarouselBootstrap from './carousel-bootstrap/Carousel'
import Card from '../../components/card/Card'
import api from '../../services/api'
import './S-Home.css'
import PopCategory from './PopularCategory/PopCategory'
import Carousel from '../../components/carousel/Carousel'

export default function Home() {
  const [products, setProduct] = useState([])

  useEffect(() => {
    api.get('/').then((response) => {
      setProduct(response.data)
    }).catch((error) => {
      console.log('erro:'+error)
    })
  }, [])

  return (
    <>
      <CarouselBootstrap/>
      <div className="container mt-5">
        <h3>Ofertas do dia</h3>
      </div>
      <Carousel>
        {
          products.map((item) => {
            return (<Card key={item.id} tittle={item.Title} price={item.Price}/>)
          })
        }
      </Carousel>
      <div className="container mt-5">
        <PopCategory/>
      </div>
    </>
  )
}
