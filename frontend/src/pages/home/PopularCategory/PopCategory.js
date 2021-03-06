import React, { useEffect } from 'react'
import './S-PopCategory.css'

export default function PopCategory() {

  useEffect(() => {
    var ResponsePopCard = document.querySelectorAll(".PopCategory-card")

    if (window.matchMedia("(max-width: 785px)").matches) {
      for (let c=0; c < ResponsePopCard.length; c++) {
        ResponsePopCard[c].classList.remove("d-flex", "flex-row")
      }
    } else {
      for (let c=0; c < ResponsePopCard.length; c++) {
        ResponsePopCard[c].classList.add("d-flex", "flex-row")
      }
    }
  }, [])

  return (
    <>
      <div className="container mt-5 mb-5">

        <div className="d-flex flex-row PopCategory-card">
          <div className=" card-size">
            <div className="d-flex flex-row ">
              <div className="p-2 item-category border-top-left-radius">
                <div className="centralize-category">
                  <span className="material-icons-outlined icon-category">headset</span>
                  <div>Acessórios</div>
                </div>
              </div>

              <div className="p-2 item-category border-top-right-radius">
                <div className="centralize-category">
                  <span className="fas fa-mobile-alt icon-category"></span>
                  <div>Smartphones</div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-row">
              <div className="p-2 item-category left-radius">
                <div className="centralize-category">
                  <span className="fas fa-gamepad icon-category"></span>
                  <div>Games</div>
                </div>
              </div>

              <div className="p-2 item-category right-radius">
                <div className="centralize-category">
                  <span className="material-icons-outlined icon-category">desktop_windows</span>
                  <div>Informática</div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-row big-card w-75 primary-big-card">
            <div className="align-card">
              <div className="card-part-text">
                <small>Dê uma olhada agora!</small>
                <h3>Os melhores produtos da categoria de Tecnologias!</h3>
                <button className="btn btn-success mt-3">Ver mais</button>
              </div>
            </div>
            <div className=" card-part-image border-top-right-radius"></div>
          </div>
        </div>
      </div>

    </>
  )
}
