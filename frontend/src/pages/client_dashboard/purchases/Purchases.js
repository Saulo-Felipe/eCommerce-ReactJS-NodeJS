import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'


export default function Purchases() {
	var location = useLocation()
	useEffect(() => {
	  if (location.pathname === "/client_dashboard/purchases") {
	    var icons = document.querySelectorAll('.icon-dashboard')

	    for (var c=0; c < icons.length; c++) {
	      icons[c].classList.remove('active-here')
	    }


	    document.querySelector('.icon-buy').classList.add('active-here')
	    document.querySelector('.title-buy').classList.add('active-here')
	  }
	}, [])


	return (
		<h1>Compras</h1>
	)
}