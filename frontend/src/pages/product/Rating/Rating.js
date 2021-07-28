import React, { useState, useEffect } from 'react'
import './S-Rating.css'



export default function Rating() {

	const [limitAmount, setLimitAmount] = useState(0)
	const [colorComment, setColorComment] = useState('text-secondary')
	const [rating, setRating] = useState() 
//	const [limitComments, setLimitComments] = useState([])


	function commentChanges(change) {
		var value = change.target.value

		if (value.length > 100) {
			setColorComment('text-warning')
		} else if (value.length > 190) {
			setColorComment('text-danger')
		} else if (value.length === 0) {
			setColorComment('text-secondary')
		} else {
			setColorComment('text-success')
		}
		setLimitAmount(value.length)
	}

	async function submitNewComment() {
		var response = await api.post('')
	}


	useEffect(() => {

/*		var allComments = document.querySelectorAll('.content-comment')

		for (var c=0; c < allComments.length; c++) {

			if (allComments[c].innerText.length > 300) {
				var split = allComments[c].innerText.split("")
				var smallComment = ""

				split = split.map((item, index) => {
					if (index <= 300) {
						allComments[c].innerText += String(item)  
						if (index === 300) {
							allComments[c].innerHTML += "<span class='text-primary ms-2'>Ver Mais</span>"
						}
					}
				})
			}

		}

*/


	}, [])


	return (
		<div className="container">

			<hr className="mt-5 mb-5"/>

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

				<div className="new-comment mt-3 shadow p-5">
					<h3>Deixe sua opinião :)</h3>
					<label htmlFor="comment-input">Comentário</label>
					<textarea className="form-control" id="comment-input" onChange={commentChanges}></textarea>
					<div className={`float-end ${colorComment}`}> {limitAmount} / 200</div>

					<br />
					<button className="btn btn-outline-primary" onClick={submitNewComment}>Adicionar comentário</button>
				</div>

				<div className="all-comments pb-5 mt-5">
					
					<div className="comment">
					    <div className="d-flex _comment-informations">
							<div className="img-user-comment">
								<img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/user.png/null/profile`} alt="" />							
							</div>
							<div className="user-name-comment ms-2 d-flex">
								<div>Saulo Felipe</div>
								<div className="text-warning ms-3 ">
									<i class="fas fa-star ms-1"></i>
									<i class="fas fa-star ms-1"></i>
									<i class="fas fa-star ms-1"></i>
									<i class="fas fa-star ms-1"></i>
									<i class="fas fa-star ms-1"></i>
								</div>
							</div>
						</div>

						<div className="d-flex">
							<div className="space-between-comment"></div>

							<div className="content-comment">
								dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 								dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 								dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
							</div>
						</div>
					</div>

					<hr className="m-5"/>

					<div className="comment">
					    <div className="d-flex _comment-informations">
							<div className="img-user-comment">
								<img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/user.png/null/profile`} alt="" />							
							</div>
							<div className="user-name-comment ms-2 d-flex">
								<div>Maria Souza</div>
								<div className="text-warning ms-3 ">
									<i class="fas fa-star ms-1"></i>
									<i class="fas fa-star ms-1"></i>
									<i class="fas fa-star ms-1"></i>
									<i class="fas fa-star ms-1"></i>
									<i class="fas fa-star ms-1"></i>
								</div>
							</div>
						</div>

						<div className="d-flex">
							<div className="space-between-comment"></div>

							<div className="content-comment">
								dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
								dwjklfjlds dskjfl jsdljflds dwjklfjlds dskjfl jsdljflds 
							</div>
						</div>
					</div>

				</div>
			</div>
			
		</div>

	)
}