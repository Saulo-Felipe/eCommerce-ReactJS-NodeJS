import React, { useEffect } from 'react'
import './S-Card.css'
import notebook from './images/notebook.png'

export default function Card(props) {

  useEffect(() => {
    var IMGproduct = document.querySelectorAll(".imgOriginal")

    for (let c=0; c < IMGproduct.length; c++) {
      if (IMGproduct[c].height > IMGproduct[c].width) {
        IMGproduct[c].classList.add("BiggerHeight")
      } else {
        IMGproduct[c].classList.add("BiggerWidth")
      }
    }

  }, [])

  return (
    <div className="PrimaryCard ms-2">
      <div className="SecondaryCard">
        <div className="ThirdCard">
        <div className="heartLike">
          <span class="material-icons-outlined ">favorite_border</span>
        </div>

          <div className="imageProduct">
            <img className="imgOriginal" src={notebook} />
          </div>
          <hr/>
          <div className="contentProduct">
            <span className="oldPrice">R$ 1999</span>
            <div className="titleCard">{props.title}</div>
            <div className="priceCard">R$ {props.price}.<span className="DecimalPrice">00</span></div>
            <span className="subPrice">ou 10x de 24,90</span>
            <div className="d-flex flex-row rating">
              <div className="stars">
                <span class="material-icons-outlined star">star</span>
                <span class="material-icons-outlined star">star</span>
                <span class="material-icons-outlined star">star</span>
                <span class="material-icons-outlined star">star</span>
                <span class="material-icons-outlined star">star_half</span>
              </div>
              <div className="amountRating">4.5mil</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
