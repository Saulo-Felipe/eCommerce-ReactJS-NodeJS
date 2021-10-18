import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DevelopmentPage } from '../../pages/noMatch/NoMatch'
import api from '../../services/api'
import { isAuthenticated } from '../../services/isAuthenticated'

export default function SubHeader(props) {

	const [categories, setCategories] = useState([])
	const [isLogged, setIsLogged] = useState(null)

	useEffect(() => {
		(async() => {

			var response = await api.post('/all-categories')

			if (response.data.error) return alert('Erro ao listar categorias')

			setCategories(response.data.result)

		})();

	}, [])
	
	return (
		<>
		<nav className="navbar navbar-expand-lg navbar-light bg-light navbar-secondary">
		  <div className="container-fluid">

		    <div className="dropdown category">
		      <div className="dropdown-toggle color-hover cursor-pointer" type="button " id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
		        <span className="material-icons-outlined">widgets</span> <span>Categorias</span>
		      </div>
		      <ul className="dropdown-menu active-hover" aria-labelledby="dropdownMenu2">
		      	<div className="d-flex w-98 p-3">
		      		<div className="SubHeader-categories">
				        {
				        	categories.map(item => <div key={item.id} className="border p-1 m-1 subheader-category">{item.category_name}</div>)
				        }
		      		</div>

		      		<div className="w-40 align-self-center">
		      			<img src={require('../../images/construct.png').default} alt="construct page" />
		      		</div>

		        </div>
		      </ul>
		    </div>

		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarSupportedContent">
		      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

		        <li className="nav-item ms-3">
		          <Link className="nav-link active color-hover" aria-current="page" to="/">Home</Link>
		        </li>

		        <li className="nav-item ms-2">
		          <div className="nav-link active color-hover cursor-pointer" data-bs-toggle="modal" data-bs-target="#developmentPage">Ofertas do dia</div>
		        </li>

		        <li className="nav-item ms-2">
		          <div className="nav-link active color-hover cursor-pointer" data-bs-toggle="modal" data-bs-target="#developmentPage">Mais vendidos</div>
		        </li>

		        <li className="nav-item ms-2">
		          <div className="nav-link active color-hover cursor-pointer"onClick={() => {window.scrollTo(0, 100000)}}>Contato</div>
		        </li>

				<li className="nav-item ms-2" data-bs-toggle="modal" data-bs-target="#launchCityModal">
		          <div className="nav-link active color-hover cursor-pointer" >Localização</div>
		        </li>

		        <li className="nav-item ms-2">
		          <Link to="/admin/dashboard" className="nav-link active color-hover">Dashboard (admin)</Link>
		        </li>
		      </ul>

		    </div>
		  </div>
		</nav>
		<DevelopmentPage /> 
		</>
	)
}