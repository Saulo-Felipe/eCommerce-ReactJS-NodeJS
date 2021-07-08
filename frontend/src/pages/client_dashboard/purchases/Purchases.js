import React, { useEffect } from 'react'


export default function Purchases(props) {
	useEffect(() => {
		props.hooks.setConfigs({
			PagePosigion: 'Compras', 
			TitleOne: 'Minhas Compras', 
			TitleTwo: 'Lista de todas as minhas compras: '
		})

	    // ==========| Active color on actual page |==========
	    var icons = document.querySelectorAll('.icon-dashboard')
	    for (var c=0; c < icons.length; c++) {
	      icons[c].classList.remove('active-here')
	    }
	    document.querySelector('.alternative-icon-buy').classList.add('active-here')
	    document.querySelector('.alternative-title-buy').classList.add('active-here')
	    // ==========| Active color on actual page |==========
	}, [])


	return (
		<h1>Compras</h1>
	)
}