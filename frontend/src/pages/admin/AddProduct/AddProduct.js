import React, { useEffect, useState} from 'react'
import './S-AddProduct.css'
import api from '../../../services/api'

export default function AddProduct() {
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
  var CategoriesToProducts = []



  function handleChangeFom(values) {
    console.log('Values: ', productInfo)
    var id = values.target.id

    if (id === "name") {
      productInfo.name = values.target.value
    }
    else if (id === "amountProduct")
      productInfo.amount = parseInt(values.target.value)
    else if (id === "cover")
      productInfo.cover = values.target.files[0]
    else if (id === "descriptionProduct")
      productInfo.description = values.target.value
    else if (id === "multipleImages") 
      productInfo.images = values.target.files
    else if (id === "price")
      productInfo.price = values.target.value

    console.log(productInfo)
  }

  async function submitProduct() {
    if (productInfo.name === null || productInfo.amount === null || productInfo.cover === null || productInfo.description === null || productInfo.images === null || productInfo.price === null) {
      console.log("Nulos: ", productInfo)
      console.log('teste de persistencia: ', CategoriesToProducts)
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

      await api.post('/admin/new-product', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
      })

      var response = await api.post('/admin/relationship', { CategoriesToProducts: CategoriesToProducts })
      
      if (response.data.error) alert('Erro interno, por favor tente mais tarde.')
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(<div><img className="text-center" src={require("../../../images/loading.gif").default} width="100px" /></div>)
      var {data} = await api.post('/admin/get-product-Categories')
      setLoading()
      if (data.error) return alert('Error encontrado')

      setCategories(data.result)
    })()
  }, [])


  async function searchCategory(changes) {
    var category = changes.target.value
    setLoading(<div className="text-center"><img src={require("../../../images/loading.gif").default} width="100px" /></div>)
    var response = await api.post('/admin/categories', { type: "especific category", category })
    setLoading()

    console.log('Todos: ', response.data.result)

    setCategories(response.data.result)
  }

  function addCategory(changes, id, categoryName) {
    if (changes.target.checked === true) {

      var confirm = true
      for (var item of selectedCategories)
        if (item.category_name === categoryName)
          confirm = false

      if (confirm === true) {
        setSelectedCategories([...selectedCategories, {id: id, category_name: categoryName }])
        CategoriesToProducts.push(id)
      }

    } else {
      var unSelectCategory = selectedCategories
      for (var item of unSelectCategory) {
        if (item.category_name === categoryName) {
          unSelectCategory = unSelectCategory.filter(category => category.category_name.indexOf(categoryName))
        }
      }

      setSelectedCategories(unSelectCategory)

    }
  }

  function removeSelectedCategory(id, categoryName) {
    for (var item of selectedCategories) {
      if (item.id === id) {
        setSelectedCategories(selectedCategories.filter(category => category.category_name.indexOf(categoryName)))
      }
    }

    CategoriesToProducts = CategoriesToProducts.filter((item) => item !== id)
  }

  return (
    <>
      <div className="container mt-3 mb-5">
        <div className="newProduct">
          <h5 className="mt-3 mb-3">Criar um novo produto</h5>
          <div className="form-controler">
            <label htmlFor="name">Nome do Produto</label>
            <input autoComplete="off" id="name" className="formProduct form-control" onChange={handleChangeFom} required/>

            <div className="validation-form d-flex flex-box mt-2">
              <div className="validade me-2">
                <label htmlFor="amountProduct">Quantidade do Produto: </label>
                <input autoComplete="off" id="amountProduct" type="number" className="form-control" required pattern="[1-99999]+$" onChange={handleChangeFom}/>
              </div>
              <div className="validade">
                <label htmlFor="amountProduct">Capa do produto: </label>
                <input autoComplete="off" id="cover" type="file" className="form-control " onChange={handleChangeFom} required />
                {/*<div className="text-center"><img id="FilePreview" width="50%" alt="preview"/></div>*/}
              </div>
            </div>

            <label htmlFor="descriptionProduct" className="mt-2">Descrição do produto: </label>
            <textarea id="descriptionProduct" className="form-control " onChange={handleChangeFom} required></textarea>

            <label htmlFor="multipleImages" className="mt-2">Imagens do produto: </label>
            <input autoComplete="off" type="file" id="multipleImages" className="form-control " onChange={handleChangeFom} multiple required/>
            <small className="obs">*Você pode selecionar mais de uma imagem</small>


            <label htmlFor="price" className="mt-2">Preço do produto: </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">R$</span>
              <input autoComplete="off" type="number" className="form-control " id="price" min="0" onChange={handleChangeFom} required aria-describedby="basic-addon1"></input>
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
                    <i class="fas fa-times"></i>
                  </div>
                </div>
              })
            }
          </div>

          <button className="btn btn-success mt-2" onClick={submitProduct}>Finalizar Cadastro</button>
        </div>
      </div>
    </>
  )
}
