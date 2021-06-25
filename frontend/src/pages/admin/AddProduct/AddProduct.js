import React, { useEffect, useState } from 'react'
import './S-AddProduct.css'
import logoReact from './react-logo.png'
import api from '../../../services/api'

export default function AddProduct() {
  var productInfo = {
    name: null,
    amount: null,
    cover: null,
    description: null,
    images: null,
    price: null
  }

  var [categories, setCategories] = useState([])
  var CategoriesToProducts = []

  function handleChangeFom(values) {
    var id = values.target.id

    if (id === "name")
      productInfo.name = values.target.value
    else if (id === "amountProduct")
      productInfo.amount = values.target.value
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
      alert('Preencha todos os campos para poder finalizar o cadastro!')
    } else {
      var formData = new FormData()

      formData.append('cover', productInfo.cover)

      for(var c=0; c < productInfo.images.length; c++) {
        formData.append('images', productInfo.images[c])
      }

      for (let c in productInfo) {
        if (c != "images" && c != "cover" ) {
          formData.append(c, productInfo[c])
        }
      }

      await api.post('/admin/new-product', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
      })

      var response = await api.post('/admin/relationship', { CategoriesToProducts: CategoriesToProducts })
      
    }

  }

  function InputFileChange(changes) {
    const file = changes.target
    
    var reader = new FileReader()
    reader.onload = () => {
      var dataURL = reader.result
      var preview = document.querySelector('#FilePreview')
      preview.src = dataURL
    }
    reader.readAsDataURL(file.files[0])
  }

  useEffect(() => {
    (async () => {
      var response = await api.post('/admin/products')
      console.log(response)
      setCategories(response.data.result)
    })()
  }, [])


  async function searchCategory(changes) {
    var category = changes.target.value

    var response = await api.post('/admin/categories', { type: "especific category", category })

    setCategories(response.data.result)
  }

  async function addCategory(changes, id) {
    if (changes.target.checked === true) {
      CategoriesToProducts.push(id)
      console.log(CategoriesToProducts)
    } else {
      CategoriesToProducts.splice(CategoriesToProducts.indexOf(id), 1)
      console.log(CategoriesToProducts)
    }
  }


  return (
    <>
      <div className="container mt-3 mb-5">
        <div className="newProduct">
          <h5 className="mt-3 mb-3">Criar um novo produto</h5>
          <div className="form-controler">
            <label htmlFor="name">Nome do Produto</label>
            <input id="name" className="formProduct form-control" onChange={handleChangeFom} required/>

            <div className="validation-form d-flex flex-box mt-2">
              <div className="validade me-2">
                <label htmlFor="amountProduct">Quantidade do Produto: </label>
                <input id="amountProduct" type="number" className="form-control" required pattern="[1-99999]+$" onChange={handleChangeFom}/>
              </div>
              <div className="validade">
                <label htmlFor="amountProduct">Capa do produto: </label>
                <input id="cover" type="file" className="form-control " onChange={InputFileChange, handleChangeFom} required />
                <div className="text-center"><img id="FilePreview" width="50%" /></div>
              </div>
            </div>

            <label htmlFor="descriptionProduct" className="mt-2">Descrição do produto: </label>
            <textarea id="descriptionProduct" className="form-control " onChange={handleChangeFom} required></textarea>

            <label htmlFor="multipleImages" className="mt-2">Imagens do produto: </label>
            <input type="file" id="multipleImages" className="form-control " onChange={handleChangeFom} multiple required/>
            <small className="obs">*Você pode selecionar mais de uma imagem</small>


            <label htmlFor="price" className="mt-2">Preço do produto: </label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">R$</span>
              <input type="number" className="form-control " id="price" min="0" onChange={handleChangeFom} required aria-describedby="basic-addon1"></input>
            </div>

          </div>

          <div className="d-flex flex-row">
            <h5 className="w-100 mb-3">Adicione categorias ao seu produto</h5>
            <div><input type="text" onChange={searchCategory} placeholder="Pesquise por uma categoria..." /></div>
          </div>
          <div className="container-categories-addProducts">
            {
              categories.length === 0 ?
              <h5>Nenhuma categoria encontrada</h5> :
              categories.map((item) => {
                return <div className="">
                  <input type="checkbox" className="checkbox-all-categories d-inline me-2" id={`${item.id}`} onChange={(changes) => addCategory(changes, item.id)}/> 
                  <label htmlFor={`${item.id}`} className="d-inline">{item.category_name}</label>
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
