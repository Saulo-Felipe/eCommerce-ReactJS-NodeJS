import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './S-Search.css'
import api from '../../services/api'
import Card from '../../components/card/Card'
import Accordion from './accordion/Accordion'

export default function Search() {
  const search = useParams()
  const value = search.value

  const [searchResult, setSearch] = useState([])
  const [Filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0
  })

  useEffect(async () => {
    const resultSearch = await api.post("/search", { search: value, Filters })

    if (resultSearch.data.error)
      setSearch({error: resultSearch.data.error})

    setSearch(resultSearch.data.result)
  }, [search, Filters])

  async function filterPrice() {
    var minPrice = document.querySelector("#min-price").value
    var maxPrice = document.querySelector("#max-price").value

    setFilters({
      minPrice: minPrice.length == 0 ? 0 : minPrice ,
      maxPrice: maxPrice.length == 0 ? 0 : maxPrice
    })
  }

  return (
    <div className="SearchPage">
      <div className="TopFilter">
        <div className="d-flex flex-row mt-4">
          <h4 className="text-white titleSearch w-100">
            Encontre o Produto perfeito para você!
          </h4>
          <div className="text-white pe-5 d-flex iconsNavigate">
            <span class="material-icons-outlined iconNavigateSearch">home</span> Home
            <span class="material-icons-two-tone iconNavigateSearch">navigate_next</span> Pesquisa
            <span class="material-icons-two-tone iconNavigateSearch">navigate_next</span> { value }
          </div>
        </div>
      </div>

      <div className="ContentSearch d-flex flex-box">
        <div className="LeftSearch">

          <h3>Use Filtros personalizados para sua busca</h3>

          <hr className="mt-4 mb-4"/>

          <div className="itemLeftSearch">
            <h5 className="mb-3">Categorias</h5>
            <Accordion/>
          </div>

          <hr className="mt-4 mb-4"/>

          <div className="PriceSearchFilter itemLeftSearch">
            <h5 className="mb-3">Preço</h5>

            <div className="row">
              <div className="col">
                <span>Minimo</span>
                <input className="form-control" id="min-price" type="text" placeholder="R$"/>
              </div>

              <div className="col">
                <span>Máximo</span>
                <input className="form-control" id="max-price" type="text" placeholder="R$"/>
              </div>
            </div>
            <small className="error_msg">{searchResult.error ? searchResult.error : ""}</small>
            <button className="btn btn-success mt-3" onClick={filterPrice}>Aplicar</button>
          </div>

          <hr className="mt-3 mb-3"/>
        </div>
        <div className="container searchContentResult">
          <div className="FilterTop d-flex">
            <div>
              <span className="text-white pe-2">Ordenar por: </span>
              <select className="optionsFilter">
                <option>Popular</option>
                <option>Preço - Menor para o Maior</option>
                <option>Preço - Maior para o Menor</option>
                <option>Melhores avaliações</option>
                <option>A - Z</option>
                <option>Z - A</option>
              </select>
              <span className="ps-2 text-white"> de {searchResult.length} produtos</span>
            </div>

            <div className=" d-flex ps-5">
              <span className="material-icons-outlined backPageSearch">arrow_back_ios</span>
              <span className="pageSearchIndex"> 1 / 5 </span>
              <span className="material-icons-outlined nextPageSearch">arrow_forward_ios</span>
            </div>
          </div>
          <div className="ResultProducts ">
            {
              searchResult.length == 0
                ? <h1 className="noResult">Nenhum Result encontrado para Pesquisa: {value}</h1>
                : searchResult.map((product) => {
                  return(
                    <Card title={product.Title} price={product.Price}/>
                  )
                })
            }
          </div>
        </div>

      </div>
    </div>
  )
}
