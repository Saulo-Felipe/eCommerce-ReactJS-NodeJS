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