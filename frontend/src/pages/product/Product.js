import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import api from '../../services/api'
import './S-Product.css'
import { isAuthenticated } from '../../services/isAuthenticated'
import Rating from './Rating/Rating'
import Carousel from '../../components/carousel/Carousel'
import Card from '../../components/card/Card'

import { useDispatch } from 'react-redux'
import { changeLikeCount } from '../../store/slices/likeSlice'
import { useSelector } from 'react-redux'
import { selectLike } from '../../store/slices/likeSlice'


export default function Product() {

	const {id} = useParams()
	const [product, setProduct] = useState({ product_name: "" })
	const [imageFiles, setImageFiles] = useState([])
	const [selectedImage, setSelectedImage] = useState()
	const [likeIcon, setLikeIcon] = useState()
	const [productSuggestion, setProductSuggestion] = useState([])
	const [allRating, setAllRating] = useState({ note: 0, totalRating: 0 })
	const [productStars, setProductStars] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

	const dispatchLike = useDispatch()
	const { likeCount } = useSelector(selectLike)


	useEffect(() => {
		window.scrollTo(0, 0);
		(async() => {
			const {data} = await api.post('/product', {id: id})

			if (data.error) return alert("Erro ao buscar dados do produto!")

			setProduct(data.result)

			if (data.result) {
				var imgs = data.result.images.split(" ")
				var imgHTML = []
				for (var c in imgs) {
					if (imgs[c].length !== 0)
						imgHTML.push(`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${imgs[c]}/${data.result.id}/multiples`)
					if (c === 1) 
						setSelectedImage(`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${imgs[c]}/${data.result.id}/	multiples`)
				}
				setImageFiles(imgHTML)
			}


			//Get likes
				var isLogged = await isAuthenticated()

                if (isLogged !== null && Number(isLogged.isAdmin) === 1)
                    setIsAdmin(true)

				if (isLogged !== null) {
		      var response = await api.post('/likes', { idUser: isLogged.id, idProduct: id })				

		      if (response.data.like === true)
		      	setLikeIcon(<i className="fas fa-heart fa-lg like-this text-danger"></i>)
		      else
		      	setLikeIcon(<i className="far fa-heart fa-lg like-this"></i>)
				} else
		      setLikeIcon(<i className="far fa-heart fa-lg like-this"></i>)

		  //Get Suggestion
		  	var suggestion = await api.post('/product-suggestion', { productID: id })

		  	if (suggestion.data.error) return alert("Erro ao buscar produtos similares")

	  		var allSuggestion = suggestion.data.result
		  	if (allSuggestion) {

					for (var count=0; count < allSuggestion.length; count++) {

				    var position = JSON.stringify(allSuggestion).indexOf(JSON.stringify(allSuggestion[c]))

				    if (position !== -1) {
			        var quant = 0
			        
			        for (var e=0; e < allSuggestion.length; e++) {
		            if (JSON.stringify(allSuggestion[count]) === JSON.stringify(allSuggestion[e]))
		              quant++
			        }
			        
			        if (quant > 1) {
			          delete allSuggestion[count]
			        }
				    }

					}
				}

				setProductSuggestion(allSuggestion)

		// Carousel
		  var next = document.querySelectorAll(".next-carousel")
		  var prev = document.querySelectorAll(".prev-carousel")
		  var scrollCarousel = document.querySelectorAll(".carousel-scroll")
		  next[0].addEventListener("click", () => {
		    scrollCarousel[0].scrollBy(400, 0)
		  })
		  prev[0].addEventListener("click", () => {
		    scrollCarousel[0].scrollBy(-400, 0)
		  })

		})();

		// star rating icons
			var starsArray = []
			for (var c=0; c < 5; c++) {
				if (c + 0.5 < allRating.note) {
					starsArray.push(<span className="material-icons-outlined">star</span>)
				} else 
					starsArray.push(<span className="material-icons-outlined">grade</span>)
				
			}
			setProductStars(starsArray)

	}, [allRating.note])

	function changeSelect(url, index) {
		setSelectedImage(url)	

		var imgs = document.querySelectorAll('.product-one-image-select')

		for (var count=0; count < imgs.length; count++) {
			if (Number(count) === Number(index)) {
				imgs[count].classList.remove('no-selected')
				imgs[count].classList.add('selected')
			} else {
				imgs[count].classList.add('no-selected')
				imgs[count].classList.remove('selected')
			}
		}

	}

	async function changeLike() {
		
    var idUser = await isAuthenticated()
    if (idUser === null) {
      alert("Você precisa estar logado para dar like em produtos.")
    } else {
      var response = await api.post('/likes', { idUser: idUser.id, idProduct: id })

      if (response.data.like === false) {
        await api.post('/new-like', { idUser: idUser.id, idProduct: id, type: 'like' })
        setLikeIcon(<i className="fas fa-heart fa-lg like-this text-danger"></i>)
        dispatchLike(changeLikeCount(likeCount+1))
      } else {
        await api.post('/new-like', { idUser: idUser.id, idProduct: id, type: 'dislike' })
        setLikeIcon(<i className="far fa-heart fa-lg like-this"></i>)
        dispatchLike(changeLikeCount(likeCount-1))
      }
    }
	}


	return (
		<div className="bg-white">
			<div className="top-product-contain"><h3>{product.product_name}</h3></div>
			<div className="container product-container d-flex">
		    <div className="select-image-container">
		    	{
		    		imageFiles.map((item, index) =>
		    			<div className={`product-one-image-select ${index === 0 ? "selected" : "no-selected"}`} 
		    				onClick={() => changeSelect(item, index)}
		    			>
		    				<img  src={`${item}`}  alt={`produto ${Date.now()}`} />
		    			</div>
		    		)
		    	}
		    </div>

		    <div className="the-image-selected-container">
		    	<img src={`${selectedImage}`} alt="product selected" />
		    </div>

		    <div className="information-about-product-container">
			    <div className="d-flex">
			    	<div className="products-star-avaliation d-flex">
			    		<div className="text-warning">
			    			{
			    				productStars.map(item => item)
			    			}
			    		</div>
			    		<div className="avaliations-stars">{ allRating.totalRating } avaliações</div>
			    	</div>
			    	<div className=" like_contain_product" onClick={() => changeLike()}>{likeIcon}</div>
					</div>
		    	<h4 className="mb-3 mt-4">{product.product_name}</h4>

					<small className="text-decoration-line-through mt-2">199.99</small>
		    	<div className="display-6 text-primary">R$	{product.price} <small className="text-success fs-5"> 7% OFF</small></div>
		    	<div >ou 12x de R${(Number(product.price) / 12).toFixed(2) }</div>

		    	<div className="mt-5 mb-2 shadow">
		    		<button className="btn btn-success form-control">Comprar Agora</button>
		    	</div>

		    	<div className="d-flex add-to-card-container">
		    		<select className="form-control w-25 me-2">
		    			<option value="">1</option>
		    			<option value="">2</option>
		    			<option value="">3</option>
		    			<option value="">4</option>
		    			<option value="">5</option>
		    			<option value="">6</option>
		    			<option value="">7</option>
		    			<option value="">8</option>
		    			<option value="">9</option>
		    		</select>
		    		<div className="w-75">
		    			<button className="btn btn-primary form-control shadow btn-add-to-cart">Adicionar ao carrinho</button>
		    		</div>
		    	</div>
		    </div>
			</div>

			<h3 className="container">
				Produtos Similares
			</h3>
			<Carousel>
				{
					productSuggestion.map(product => {
						return <Card 
							key={product.id} 
							title={product.product_name} 
							cover={product.cover} 
                            description={product.description}
							price={product.price} 
							id={product.id}
							sale={product.sale}
							createdAt={product.createdAt}
                            isAdmin={isAdmin}

						/>
					})
				}
			</Carousel>


			<div className="product-description container mt-5">
				<h4 className="mb-3">Descrição: </h4>
				<p className="lead">{product.description}</p>
			</div>

			<Rating rating={{ allRating, setAllRating }}/>

		</div>
	)
}