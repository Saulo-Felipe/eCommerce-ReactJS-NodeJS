import React, { useEffect, useState } from 'react'
import CarouselBootstrap from './carousel-bootstrap/Carousel'
import Card from '../../components/card/Card'
import api from '../../services/api'
import './S-Home.css'
import PopCategory from './PopularCategory/PopCategory'
import LeftPopCategory from './PopularCategory/Left-PopCategory'
import Carousel from '../../components/carousel/Carousel'


export default function Home() {
  const [products, setProduct] = useState([])

  useEffect(() => {
    (async () => {
      var response = await api.get('/')
      setProduct(response.data)
    })()
  }, [])

  return (
    <>
      <CarouselBootstrap/>

      <div className="container mt-5">
        <h3 className="ms-2">Ofertas do dia</h3>
      </div>

      <Carousel>
        {
          products.map((item) => {
            return (<Card key={item.id} title={item.product_name} cover={item.cover} price={item.price} id={item.id} />)
          })
        }
      </Carousel>

      <PopCategory/>

      <div className="container mt-5 mb-2">
        <h3 className="ms-2">Produtos mais vendidos</h3>
      </div>
      <Carousel>
        {
          products.map((item) => {
            return (<Card key={item.id} title={item.product_name} cover={item.cover} price={item.price} id={item.id} />)
          })
        }
      </Carousel> 
             
      <LeftPopCategory/>
    </>
  )
}
