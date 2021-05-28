import React, { useEffect } from 'react'
import './S-Carousel.css'

export default function Carousel({children}) {
  useEffect(() => {
    var next = document.querySelector(".next-carousel")
    var prev = document.querySelector(".prev-carousel")
    var scrollCarousel = document.querySelector("#root > div.PrimaryCarousel.container > div")

    next.addEventListener("click", () => {
      scrollCarousel.scrollBy(200, 0)
    })

    prev.addEventListener("click", () => {
      scrollCarousel.scrollBy(-200, 0)
    })

  }, [])

  return (
    <>
    <div className="PrimaryCarousel container">
      <button className="material-icons-outlined mov-carousel next-carousel">arrow_forward_ios</button>
      <button className="material-icons-outlined mov-carousel prev-carousel">arrow_back_ios</button>
      <div className="carouselStore">
        {children}
        <div className="endCarousel"></div>
      </div>
    </div>
    </>
  )
}
