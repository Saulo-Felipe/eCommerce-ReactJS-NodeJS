import React, { useEffect } from 'react'
import './S-Carousel.css'

export default function Carousel({children}) {
  useEffect(() => {

  }, [])

  return (
    <>
    <div className="PrimaryCarousel container">
      <button className="material-icons-outlined mov-carousel next-carousel">arrow_forward_ios</button>
      <button className="material-icons-outlined mov-carousel prev-carousel">arrow_back_ios</button>
      <div className="carouselStore carousel-scroll">
        {children}
        <div className="endCarousel"></div>
      </div>
    </div>
    </>
  )
}
