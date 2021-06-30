import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Favorite() {

  var location = useLocation()

  useEffect(() => {
    if (location.pathname === "/client_dashboard/favorites") {
      var icons = document.querySelectorAll('.icon-dashboard')

      for (var c=0; c < icons.length; c++) {
        icons[c].classList.remove('active-here')
      }
      document.querySelector('.icon-favorite').classList.add('active-here')
      document.querySelector('.title-favorite').classList.add('active-here')
    }
  }, [])

	return (
		<div className="favorite-content ms-4">
      <div className="card-line d-flex mb-3">
        <div className="card-line-image" style={{backgroundImage: `url(${require('../../../components/header/logo-example.png').default})`}}>
        </div>
        <div className="card-line-content">
          <div className="mini-title-products">Notebook 64GB RAM</div>
          <div>
            <span className="option-category-favorite">Categorias:</span>
            <span className="result-category-favorite"> notebooks, informatica, celulares</span>
          </div>
          <div>
            <span className="option-category-favorite">Cores:</span>
            <span className="result-category-favorite"> Azul, Vermelho, Verde</span>
          </div>
          <div className="mini-price-products">R$ 59,90</div>
        </div>
        <div className="remove-container">
          <button className="btn btn-outline-danger btn-remove-favorite">
            <div className="material-icons remove-favorite-icon">delete_forever</div>
            <div className="remove-favorite-txt">Remover</div>
          </button>
        </div>
      </div>


      <div className="card-line d-flex mb-3">
        <div className="card-line-image" style={{backgroundImage: `url(${require('../../../components/header/logo-example.png').default})`}}>
        </div>
        <div className="card-line-content">
          <div className="mini-title-products">aNotebook 64GB RAM</div>
          <div>
            <span className="option-category-favorite">Categorias:</span>
            <span className="result-category-favorite"> notebooks, informatica, celulares</span>
          </div>
          <div>
            <span className="option-category-favorite">Cores:</span>
            <span className="result-category-favorite"> Azul, Vermelho, Verde</span>
          </div>                
        </div>
      </div>

      <div className="card-line d-flex mb-3">
        <div className="card-line-image" style={{backgroundImage: `url(${require('../../../components/header/logo-example.png').default})`}}>
        </div>
        <div className="card-line-content">
          <div className="mini-title-products">Notebook 64GB RAM</div>
          <div>
            <span className="option-category-favorite">Categorias:</span>
            <span className="result-category-favorite"> notebooks, informatica, celulares</span>
          </div>
          <div>
            <span className="option-category-favorite">Cores:</span>
            <span className="result-category-favorite"> Azul, Vermelho, Verde</span>
          </div>                
        </div>
      </div>
    </div>
	)
}