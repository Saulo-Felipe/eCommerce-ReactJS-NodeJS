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
  const [loading, setLoading] = useState(<div className="spinner-grow text-primary" role="status" style={{width: "3rem", height: "3rem"}}><span className="visually-hidden">Loading...</span></div>)
  const [mostPopular, setMostPopular] = useState([])

  useEffect(() => {
    (async () => {
      var response = await api.get('/')
      setLoading()
      setProduct(response.data)

      var resPopularProduct = await api.post('/most-popular-products')

      setMostPopular(resPopularProduct.data.mostPopular)

    })()

    var next = document.querySelectorAll(".next-carousel")
    var prev = document.querySelectorAll(".prev-carousel")
    var scrollCarousel = document.querySelectorAll(".carousel-scroll")
    next[0].addEventListener("click", () => {
      scrollCarousel[0].scrollBy(400, 0)
    })
    prev[0].addEventListener("click", () => {
      scrollCarousel[0].scrollBy(-400, 0)
    })

    next[1].addEventListener("click", () => {
      scrollCarousel[1].scrollBy(400, 0)
    })
    prev[1].addEventListener("click", () => {
      scrollCarousel[1].scrollBy(-400, 0)
    })

  }, [])

  return (
    <>
      <CarouselBootstrap/>

      <div className="container mt-5">
        <h3 className="ms-2">Ofertas do dia</h3>
      </div>

      <Carousel>
        {loading}
        {
          products.map((item) => {
            return (<Card key={item.id} title={item.product_name} cover={item.cover} price={item.price} id={item.id} />)
          })
        }
      </Carousel>

      <PopCategory/>

      <div className="container mt-5 mb-2">
        <h3 className="ms-2">Produtos populares</h3>
      </div>
      <Carousel>
        {loading}
        {
          mostPopular.map((item) => {
            return (<Card key={item.id} title={item.product_name} cover={item.cover} price={item.price} id={item.id} />)
          })
        }
      </Carousel> 
             
      <LeftPopCategory/>
    </>
  )
}
