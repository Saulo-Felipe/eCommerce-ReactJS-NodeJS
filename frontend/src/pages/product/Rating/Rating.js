import React from 'react'
import './S-Rating.css'



export default function Rating() {

	return (
		<div className="container">

			<hr className="mt-3 mb-3"/>

			<div className="mt-2">
				<h3>Avaliações sobre o Produto: </h3>

				<div className="text-warning mt-4 ">
					<span class="material-icons-outlined">star</span>
					<span class="material-icons-outlined">star</span>
					<span class="material-icons-outlined">star</span>
					<span class="material-icons-outlined">star</span>
					<span class="material-icons-outlined">star</span>
					<span class="material-icons-outlined">star</span>
				</div>
				<h1>5.0</h1>
			</div>
			
		</div>

	)
}