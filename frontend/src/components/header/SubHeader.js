import React from 'react'
import { Link } from 'react-router-dom'


export default function SubHeader(props) {
	const isAuthenticated = props.isAuthenticated
	

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light navbar-secondary">
		  <div className="container-fluid">

		    <div className="dropdown category">
		      <div className="dropdown-toggle color-hover" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
		        <span className="material-icons-outlined">widgets</span> <span>Categorias</span>
		      </div>
		      <ul className="dropdown-menu active-hover" aria-labelledby="dropdownMenu2">
		        <li><button className="dropdown-item" type="button">Action</button></li>
		        <li><button className="dropdown-item" type="button">Another action</button></li>
		        <li><button className="dropdown-item" type="button">Something else here</button></li>
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
		          <a className="nav-link active color-hover" aria-current="page" href="/admin">Ofertas do dia</a>
		        </li>

		        <li className="nav-item ms-2">
		          <a className="nav-link active color-hover" aria-current="page" href="/admin">Mais vendidos</a>
		        </li>

		        <li className="nav-item ms-2">
		          <a className="nav-link active color-hover" aria-current="page" href="/admin">Contato</a>
		        </li>

		        <li className="nav-item ms-2">
		          <Link to="/admin/dashboard" className="nav-link active color-hover">Dashboard (admin)</Link>
		        </li>
		      </ul>

		    </div>
		  </div>
		</nav>
	)
}