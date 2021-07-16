import React from 'react'
import './S-PopCategory.css'

export default function Left_PopCategory() {
	return (
		<div className="container mt-5 mb-5">
			<div className="d-flex flex-row PopCategory-card">

	          <div className="d-flex flex-row big-card w-75 second-big-card">
	            <div className="align-card">
	              <div className="card-part-text">
	                <small>Dê uma olhada agora!</small>
	                <h3>Encontre os melhores produtos para sua casa ;)</h3>
	                <button className="btn btn-success mt-3">Ver mais</button>
	              </div>
	            </div>
	            <div className=" card-part-image-house border-top-right-radius"></div>
	          </div>

	          <div className="card-size card-options-two">
	            <div className="d-flex flex-row ">
	              <div className="p-2 item-category border-top-left-radius">
	                <div className="centralize-category">
	                  <span className="material-icons-outlined icon-category">chair</span>
	                  <div>Casa, móveis e decoração</div>
	                </div>
	              </div>

	              <div className="p-2 item-category border-top-right-radius">
	                <div className="centralize-category">
	                  <span className="material-icons-outlined icon-category">kitchen</span>
	                  <div>Eletrodomésticos</div>
	                </div>
	              </div>
	            </div>

	            <div className="d-flex flex-row">
	              <div className="p-2 item-category left-radius">
	                <div className="centralize-category">
	                  <span className="material-icons-outlined icon-category">checkroom</span>
	                  <div>Roupas, calçados e bolsas</div>
	                </div>
	              </div>

	              <div className="p-2 item-category right-radius">
	                <div className="centralize-category">
	                  <span className="material-icons-outlined icon-category">sports_soccer</span>
	                  <div>Esporte</div>
	                </div>
	              </div>

	            </div>
	          </div>
	        </div>
		</div>
	)
}
