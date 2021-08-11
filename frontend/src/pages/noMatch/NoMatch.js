import React from 'react'
import './S-noMatch.css'


export default function noMatch() {

	return (
		<div className="nomatch">
			<h1 className="nomatch-404 text-danger">404</h1>
			<div className="nomatch-sub">Página não encontrada :/</div>
			<div className="nomatch-tri">Desculpe, a página que você está procurando não existe nessa loja.</div>
		</div>
	)
}

const DevelopmentPage = () => {

	return (
		<div className="modal fade" id="developmentPage" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalLabel">Essa página ainda está em desenvolvimento!</h5>
		        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div className="modal-body text-center">
		        <img src={require("../../images/construct.png").default} alt="development Page" />
		      </div>
		    </div>
		  </div>
		</div>
	)
}

export { DevelopmentPage }