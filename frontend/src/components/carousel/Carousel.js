import React, { useEffect } from 'react'
import './S-Carousel.css'

export default function Carousel({children}) {
  useEffect(() => {
    var next = document.querySelectorAll(".next-carousel")
    var prev = document.querySelectorAll(".prev-carousel")
    var scrollCarousel = document.querySelectorAll(".carousel-scroll")


      for (var c=0; c < next.length; c++) {
        console.log('next: ', next[c])
        console.log('prev: ', prev[c])
        console.log('scroll: ', scrollCarousel[c])

        next[c].addEventListener("click", () => {
          scrollCarousel[c].scrollBy(400, 0)
        })
        prev[c].addEventListener("click", () => {
          scrollCarousel[c].scrollBy(-400, 0)
        })
      }

/*
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
*/
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
