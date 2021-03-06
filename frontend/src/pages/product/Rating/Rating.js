import React, { useState, useEffect } from 'react'
import './S-Rating.css'
import api from '../../../services/api'
import { useParams, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../../../services/isAuthenticated'
import { v4 as uuid } from 'uuid'


export default function Rating(props) {
	const {id} = useParams()
	const { pathname } = useLocation()

	const [limitAmount, setLimitAmount] = useState(0)
	const [colorComment, setColorComment] = useState('text-secondary')
	const [rating, setRating] = useState({ comment: "", rating: 0 }) 
	const [errors, setError] = useState()
	const [loading, setLoading] = useState()
	const [allComments, setAllComments] = useState([])
	const {allRating, setAllRating} = props.rating
	const [productStars, setProductStars] = useState([])


	useEffect(() => {

		updateComments()

	}, [pathname])

	useEffect(() => {
	// star rating icons
		var starsArray = []
		for (var c=0; c < 5; c++) {
			if (c + 0.5 < allRating.note) {
				starsArray.push(<span key={uuid()} className="material-icons-outlined">star</span>)
			} else {
				starsArray.push(<span key={uuid()} className="material-icons-outlined">grade</span>)
			}
		}
		setProductStars(starsArray)

	}, [allRating.note, pathname])

	function commentChanges(change) {
		var value = change.target.value

		if (value.length > 100) {
			setColorComment('text-warning')
		} 
		if (value.length === 200) {
			setColorComment('text-danger')
		}
		if (value.length === 0) {
			setColorComment('text-secondary')
		}
		setLimitAmount(value.length)


		setRating({
			comment: value,
			rating: rating.rating
		})
	}

	async function submitNewComment() {
		var user = await isAuthenticated()

		if (user !== null) {

			if (rating.comment.length < 15) {
				setError("Por favor insira um comentário de no mínimo 15 caracteres.")
				setTimeout(() => setError(), 3000)
			} else if (rating.rating === 0) {
				setError("Clique nas estrelas para votar")

				setTimeout(() => setError(), 3000)
			} else {
				setLoading(<div><img src={require("../../../images/Infinity-loading.gif").default} alt="loading" width="80px"/></div>)
				var response = await api.post('/new-rating', { comment: rating, userID: user.id, productID: id })
				setLoading()

				updateComments()

				if (response.data.error) return alert('Erro ao adicionar comentário!')

				// clear de comment area
				setRating({
					comment: "",
					rating: 0
				})
				
				document.querySelector("#comment-input").value = ""

				var allStars = document.querySelectorAll('.container-stars-vote i')
				for (var starElement of allStars) {
					starElement.classList.add('far')
					starElement.classList.remove('fas')
				} 
			}

		} else {
			alert('Você precisa está logado para comentar')
		}
	}

	async function updateComments() {
		var response = await api.post('/rating', { productID: id })

		if (response.data.error) return alert('Erro ao buscar comentários')

		var countRating = 0
		for (var i=0; i < response.data.result.length; i++) {
			countRating += response.data.result[i].rating
		}

		setAllRating({
			note: countRating / response.data.result.length,
			totalRating: response.data.result.length
		})

		for (var c=0; c < response.data.result.length; c++) {
			// update comments
			var amountCount = response.data.result[c].rating
			for (var count=0; count < 5; count++) {
				if (typeof response.data.result[c].rating !==  "object") {
					response.data.result[c].rating = []
				}
				if (count < amountCount) {
					response.data.result[c].rating.push("fas fa-star ms-1")						
				} else {
					response.data.result[c].rating.push("far fa-star ms-1")						
				}
			}
		}

		setAllComments(response.data.result)		
	}

	function submitStarRating(position) {
		setRating({
			comment: rating.comment,
			rating: position
		})

		for (var c=0; c < 5; c++) {
			var allStars = document.querySelectorAll('.star-selected-rating')

			if (c < position) {
				allStars[c].classList.remove('far')
				allStars[c].classList.add('fas')				
			} else {
				allStars[c].classList.add('far')
				allStars[c].classList.remove('fas')				
			}
		} 

	}


	return (
		<div className="container">

			<hr className="mt-5 mb-5"/>

			<div className="mt-2">
				<h3>Avaliações sobre o Produto: </h3>

				<div className="text-end container-all-rating ms-4">
					<div className="mt-4 fs-1 fw-light">{isNaN(allRating.note.toFixed(1)) ? 0 : allRating.note.toFixed(1)}</div>
					<div className="text-warning">
						{
							productStars.map(item => item)
						}
					</div>
					<div>{allRating.totalRating} opiniões</div>
				</div>

				<div className="new-comment mt-3 shadow p-5">
					<h3>Deixe sua opinião :)</h3>
					<label htmlFor="comment-input">Comentário</label>
					<textarea className="form-control" id="comment-input" onChange={commentChanges} maxLength="200"></textarea>
					<div className={`float-end ${colorComment}`}> {limitAmount} / 200</div>

					<br />
					<button className="btn btn-outline-primary" onClick={submitNewComment}>Adicionar comentário</button>

					<div className="mt-3 container-stars-vote">
						<i className="far fa-star pe-2 star-selected-rating text-warning" onClick={() => submitStarRating(1)}/>
						<i className="far fa-star pe-2 star-selected-rating text-warning" onClick={() => submitStarRating(2)}/>
						<i className="far fa-star pe-2 star-selected-rating text-warning" onClick={() => submitStarRating(3)}/>
						<i className="far fa-star pe-2 star-selected-rating text-warning" onClick={() => submitStarRating(4)}/>
						<i className="far fa-star pe-2 star-selected-rating text-warning" onClick={() => submitStarRating(5)}/>
					</div>
					<div className="text-danger text-center">{errors}</div>
					{loading}
				</div>


				<div className="all-comments pb-5 mt-5">
					{
						allComments.length === 0
							? <h1>Esse produto ainda não possui nenhuma Avaliação.</h1>
							: allComments.map((item, index) => {
								return (
									<div key={index}>
										<hr className="m-4 line-comment"/>

										<div className="comment">
											<div className="d-flex _comment-informations">
												<div className="img-user-comment">
													<img src={`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${item.profile_photo}/${item.id}/profile`} alt="" />							
												</div>
												<div className="user-name-comment ms-2 d-flex">
													<div>{item.user_name}</div>
													<div className="text-warning ms-3 ">
														{
															item.rating.map(item => <i className={item} key={uuid()}></i>)
														}
													</div>
												</div>
											</div>

											<div className="d-flex mb-2">
												<div className="content-comment">
													{item.comment}
												</div>
											</div>
											
											<small className="text-secondary">{item.comment_data}</small>

										</div>
									</div>
								)
							})
					}
				</div>
			</div>
			
		</div>

	)
}