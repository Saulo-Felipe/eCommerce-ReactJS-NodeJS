import React, { useEffect, useState} from 'react'
import './S-EditProduct.css'
import api from '../../../services/api'
import { useParams } from 'react-router-dom'

export default function EditProduct() {
  const { paramsId } = useParams()
  const { paramsDescription } = useParams()
  
  
  const [productInfo, setProductInfo] = useState({
    name: null,
    amount: null,
    cover: null,
    description: null,
    images: null,
    price: null
  })
  const [loading, setLoading] = useState()
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [CategoriesToProducts, setCategoriesToProducts] = useState([])
  const [loadingAdd, setLoadingAdd] = useState()
  const [productAvalible, setProductAvalible] = useState(true)
  const [defaultProduct, setDefaultProduct] = useState({
    name: '',
    amount: '',
    description: '',
    price: ''
  })

  function handleChangeFom(values) {
    var id = values.target.id
    var value = values.target.value

    if (id === "name") {
      setProductInfo({
        name: value,
        amount: productInfo.amount,
        cover: productInfo.cover,
        description: productInfo.description,
        images: productInfo.images,
        price: productInfo.price 
      })
    } else if (id === "amountProduct") {
      setProductInfo({
        name: productInfo.name,
        amount: value,
        cover: productInfo.cover,
        description: productInfo.description,
        images: productInfo.images,
        price: productInfo.price 
      })
    } else if (id === "cover") {
      setProductInfo({
        name: productInfo.name,
        amount: productInfo.amount,
        cover: values.target.files[0],
        description: productInfo.description,
        images: productInfo.images,
        price: productInfo.price 
      })
    } else if (id === "descriptionProduct") {
      setProductInfo({
        name: productInfo.name,
        amount: productInfo.amount,
        cover: productInfo.cover,
        description: value,
        images: productInfo.images,
        price: productInfo.price 
      })
    } else if (id === "multipleImages") {
      setProductInfo({
        name: productInfo.name,
        amount: productInfo.amount,
        cover: productInfo.cover,
        description: productInfo.description,
        images: values.target.files,
        price: productInfo.price 
      })
    } else if (id === "price") {
      setProductInfo({
        name: productInfo.name,
        amount: productInfo.amount,
        cover: productInfo.cover,
        description: productInfo.description,
        images: productInfo.images,
        price: value
      })
    }
  }

  async function startState() {
    if (isNaN(Number(paramsId)) === false) {
      var {data} = await api.post('/admin/get-product', { id: paramsId, description: paramsDescription })
      
      if (data.error) return alert("Erro interno, por favor tente novamente")

      if (data.status === false) {
        setProductAvalible(false)
      } else {
        var productState = data.result[0]

        setDefaultProduct({
          name: productState.product_name,
          amount: productState.amount,
          description: productState.description,
          price: productState.price
        })

        setProductInfo({
          name: productState.product_name,
          amount: productState.amount,
          cover: productState.cover,
          description: productState.description,
          images: productState.images,
          price: productState.price 
        })

        var result = await api.post('/admin/categoriesInProduct', { id: paramsId })

        var categoryState = result.data.result

        var arrayCategories = []
        var idCategories = []
        for (var state of categoryState) {
          arrayCategories.push({id: state.id, category_name: state.category_name})
          idCategories.push(state.id)
        }
        addCategory(true, idCategories, arrayCategories)

      }

    } else {
      console.log("Entrei no else")
      setProductAvalible(false)
    }
  }

  async function submitProduct() {
    if (productInfo.name === null || productInfo.amount === null || productInfo.cover === null || productInfo.description === null || productInfo.images === null || productInfo.price === null) {
      alert('Preencha todos os campos para poder finalizar o cadastro!')
    } else {
      var formData = new FormData()

      formData.append('cover', productInfo.cover)

      for(var c=0; c < productInfo.images.length; c++) {
        formData.append('images', productInfo.images[c])
      }

      for (let c in productInfo) {
        if (c !== "images" && c !== "cover" ) {
          formData.append(c, productInfo[c])
        }
      }
      formData.append('id', paramsId)

      setLoadingAdd(<div className="text-center"><img src={require('../../../images/loading.gif').default} alt="Loading gif" width="100px"/></div>)
      var res = await api.post('/admin/edit-product', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
      })
      if (res.data.error) return alert('Erro ao adicionar produto, tente novamente ou entre em contato com o proprietario.')

      var response = await api.post('/admin/relationship', { CategoriesToProducts: CategoriesToProducts, type: 'edit' })
      
      if (response.data.error) alert('Erro interno, por favor tente mais tarde.')
      setLoadingAdd()
      window.location.href = "/"
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(<div><img className="text-center" src={require("../../../images/loading.gif").default} width="100px" alt="loading" /></div>)
      var {data} = await api.post('/admin/get-product-Categories')
      setLoading()
      if (data.error) return alert('Error encontrado')

      setCategories(data.result)
      startState()

    })()
  }, [])


  async function searchCategory(changes) {
    var category = changes.target.value
    setLoading(<div className="text-center"><img src={require("../../../images/loading.gif").default} width="100px" alt="loading 2x"/></div>)
    var response = await api.post('/admin/categories', { type: "especific category", category })
    setLoading()


    setCategories(response.data.result)
  }

  function addCategory(changes, id, categoryName) {
    if (changes === true) {
      var ids = id
      var stateCategories = categoryName

      setSelectedCategories(stateCategories)
      setCategoriesToProducts(ids)

    } else if (changes.target.checked === true) {
      console.log("Fui chamado para: ", categoryName)

      var confirm = true
      for (var item of selectedCategories)
        if (item.category_name === categoryName)
          confirm = false

      if (confirm === true) {
        setSelectedCategories([...selectedCategories, {id: id, category_name: categoryName }])
        setCategoriesToProducts([...CategoriesToProducts, id])
      }

    } else {
      var unSelectCategory = selectedCategories
      for (var count of unSelectCategory) {
        if (count.category_name === categoryName) {
          unSelectCategory = unSelectCategory.filter(category => category.category_name.indexOf(categoryName))
        }
      }

      setSelectedCategories(unSelectCategory)

    }
  }

  function removeSelectedCategory(id, categoryName) {
    for (var element of selectedCategories) {
      if (element.id === id) {
        setSelectedCategories(selectedCategories.filter(category => category.category_name.indexOf(categoryName)))
      }
    }

    setCategoriesToProducts(CategoriesToProducts.filter((item) => item !== id))
  }

  return (
    <>
     {
       productAvalible === true ?
       <div className="container mt-3 mb-5">
        <div className="newProduct">
          <h5 className="mt-3 mb-3">Edição de Produto</h5>
          <div className="form-controler">
            <label htmlFor="name">Nome do Produto</label>
            <input autoComplete="off" id="name" className="formProduct form-control" defaultValue={defaultProduct.name} onChange={handleChangeFom} required/>

            <div className="validation-form d-flex flex-box mt-2">
              <div className="validade me-2">
                <label htmlFor="amountProduct">Quantidade do Produto: </label>
                <input autoComplete="off" id="amountProduct" type="number" className="form-control" defaultValue={defaultProduct.amount} required pattern="[1-99999]+$" onChange={handleChangeFom}/>
              </div>
              <div className="validade">
                <label htmlFor="amountProduct">Capa do produto: </label>
                <input autoComplete="off" id="cover" type="file" className="form-control " onChange={handleChangeFom} required />
                {/*<div className="text-center"><img id="FilePreview" width="50%" alt="preview"/></div>*/}
              </div>
            </div>

            <label htmlFor="descriptionProduct" className="mt-2">Descrição do produto: </label>
            <textarea id="descriptionProduct" className="form-control " defaultValue={defaultProduct.description} onChange={handleChangeFom} required></textarea>

            <label htmlFor="multipleImages" className="mt-2">Imagens do produto: </label>
            <input autoComplete="off" type="file" id="multipleImages" className="form-control " onChange={handleChangeFom} multiple required/>
            <small className="obs">*Você pode selecionar mais de uma imagem</small>


            <label htmlFor="price" className="mt-2">Preço do produto: </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">R$</span>
              <input autoComplete="off" type="number" className="form-control " id="price" min="0" defaultValue={defaultProduct.price} onChange={handleChangeFom} required aria-describedby="basic-addon1"></input>
            </div>

          </div>

          <div className="d-flex flex-row">
            <h5 className="w-100 mb-3">Adicione categorias ao seu produto</h5>
            <div><input autoComplete="off" type="text" onChange={searchCategory} placeholder="Pesquise por uma categoria..." /></div>
          </div>
            <a href="/admin/new-category" target="_blank" className="link-to-create-new-category">Criar uma nova categoria</a>
          <div className="container-categories-addProducts">
            {loading}
            {
              categories.length === 0 ?
              <h5>Nenhuma categoria encontrada</h5> :
              categories.map((item) => {
                return <div className="" key={item.id}>
                  <input autoComplete="off" type="checkbox" className="checkbox-all-categories d-inline me-2" id={`${item.id}`} onChange={(changes) => addCategory(changes, item.id, item.category_name)}/> 
                  <label htmlFor={`${item.id}`} className="d-inline cursor-pointer">{item.category_name}</label>
                </div>
              })
            }
          </div>

          <div className="selected-categories-container">
            {
              selectedCategories.map(categorie => {
                return <div className="categorie-checked" key={categorie.id} onClick={() => removeSelectedCategory(categorie.id, categorie.category_name)}>
                  <div className="categorie-checked-name">{categorie.category_name}</div>
                  <div className="categorie-checked-close">
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              })
            }
          </div>

          {loadingAdd}

          <button className="btn btn-success mt-2" onClick={submitProduct}>Finalizar edição</button>
        </div>
      </div>
     :
      <h1>Este produto não existe</h1>
     }

    </>
  )
}
