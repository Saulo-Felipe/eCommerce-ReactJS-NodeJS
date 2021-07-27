import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import api from '../../services/api'
import './S-Product.css'
import { useLike } from '../../components/context/Likes'
import { isAuthenticated } from '../../services/isAuthenticated'
import { Toast } from '../../components/context/Toast'
import Rating from './Rating/Rating'
import Carousel from '../../components/carousel/Carousel'
import Card from '../../components/card/Card'


export default function Product() {

	const {id} = useParams()
	const [product, setProduct] = useState({
		product_name: ""
	})
	const [imageFiles, setImageFiles] = useState([])
	const [selectedImage, setSelectedImage] = useState()
	const [likeIcon, setLikeIcon] = useState()
	const {like, setLike} = useLike()
	const [msgAlert, setMsgAlert] = useState()
	const [productSuggestion, setProductSuggestion] = useState([])


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
					if (c == 1) 
						setSelectedImage(`${process.env.REACT_APP_SERVER_DEVELOPMENT}/images/${imgs[c]}/${data.result.id}/	multiples`)
				}
				setImageFiles(imgHTML)
			}


			//Get likes
				var isLogged = await isAuthenticated()

				if (isLogged !== null) {
		      var response = await api.post('/likes', { idUser: isLogged.id, idProduct: id })				

		      if (response.data.like === true)
		      	setLikeIcon(<i class="fas fa-heart fa-lg like-this text-danger"></i>)
		      else
		      	setLikeIcon(<i class="far fa-heart fa-lg like-this"></i>)
				} else
		      setLikeIcon(<i class="far fa-heart fa-lg like-this"></i>)

		  //Get Suggestion
		  	var suggestion = await api.post('/product-suggestion', { productID: id })

		  	if (suggestion.data.error) return alert("Erro ao buscar produtos similares")

	  		var allSuggestion = suggestion.data.result
		  	if (allSuggestion) {

					for (var c=0; c < allSuggestion.length; c++) {

				    var position = JSON.stringify(allSuggestion).indexOf(JSON.stringify(allSuggestion[c]))

				    if (position !== -1) {
			        var quant = 0
			        
			        for (var e=0; e < allSuggestion.length; e++) {
		            if (JSON.stringify(allSuggestion[c]) === JSON.stringify(allSuggestion[e]))
		              quant++
			        }
			        
			        if (quant > 1) {
			          delete allSuggestion[c]
			        }
				    }

					}
				}

				setProductSuggestion(allSuggestion)

		})();
	}, [])

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
		setMsgAlert(<Toast title={"Você deu um likes"} time={Date.now()} content={"Você gosta bastante de dar likes, não é mesmo?"} />)		
		
    var idUser = await isAuthenticated()
    if (idUser === null) {
      alert("Você precisa estar logado para dar like em produtos.")
    } else {
      var response = await api.post('/likes', { idUser: idUser.id, idProduct: id })

      if (response.data.like === false) {
        await api.post('/new-like', { idUser: idUser.id, idProduct: id, type: 'like' })
        setLikeIcon(<i class="fas fa-heart fa-lg like-this text-danger"></i>)
        setLike(like+1)
      } else {
        await api.post('/new-like', { idUser: idUser.id, idProduct: id, type: 'dislike' })
        setLikeIcon(<i class="far fa-heart fa-lg like-this"></i>)
        setLike(like-1)
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
		    				<img  src={`${item}`}  alt={`image ${Date.now()}`} />
		    			</div>
		    		)
		    	}
		    </div>

		    <div className="the-image-selected-container">
		    	<img src={`${selectedImage}`} alt="" />
		    </div>

		    <div className="information-about-product-container">
			    <div className="d-flex">
			    	<div className="products-star-avaliation d-flex">
			    		<div className="text-warning">
				    		<span class="material-icons-outlined">star</span>
				    		<span class="material-icons-outlined">star</span>
				    		<span class="material-icons-outlined">star</span>
				    		<span class="material-icons-outlined">star</span>
				    		<span class="material-icons-outlined">grade</span>
			    		</div>
			    		<div className="avaliations-stars">78 avaliações</div>
			    	</div>
			    	<div className=" like_contain_product" onClick={() => changeLike()}>{likeIcon}</div>
					</div>
		    	<h4 className="mb-3 mt-4">{product.product_name}</h4>

					<small className="text-decoration-line-through mt-2">199.99</small>
		    	<div className="display-6 text-primary">R$	{product.price} <small className="text-success fs-5"> 7% OFF</small></div>
		    	<div >ou 12x de R${(Number(product.price) / 12).toFixed(2) }</div>

		    	<div className="d-flex mt-5 add-to-card-container">
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

				{
					productSuggestion.map(product => {
						return <Card 
							key={product.id} 
							title={product.product_name} 
							cover={product.cover} 
							price={product.price} 
							id={product.id}
						/>
					})
				}

			<div className="product-description container">
				<h4 className="mb-3">Descrição: </h4>
				<p className="lead">{product.description}</p>
			</div>

			<Rating />

			{msgAlert}
		</div>
	)
}