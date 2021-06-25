import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './S-Search.css'
import api from '../../services/api'
import Card from '../../components/card/Card'
import Accordion from './accordion/Accordion'
import LoadingGIF from './images/loading.gif'

export default function Search() {
  const search = useParams()
  const value = search.value

  const [Erros, setError] = useState([])
  const [searchResult, setSearch] = useState([])
  const [Filters, setFilters] = useState({ minPrice: 0, maxPrice: 0 })
  const [count, setCount] = useState(1)
  const [countPages, setCountPages] = useState()


  useEffect(() => {
    (async function search() {

      document.querySelector('.search-loading').style.display = "block"
      document.querySelector('.search-loading-page').style.display = "block"
      const resultSearch = await api.post('/search', { search: value, Filters, position: count, pageCountPages: countPages })
      document.querySelector('.search-loading').style.display = "none"
      document.querySelector('.search-loading-page').style.display = "none"

      setCountPages(resultSearch.data.countPage)

      if (resultSearch.data.error)
        setError([resultSearch.data.error])
      else {
        setSearch(resultSearch.data.result)
        setError([])
      }
    })()
  }, [search, Filters, count])

  useEffect(() => { setCount(1) }, [search, Filters])

  useEffect(() => {
    var menuLeft = document.querySelector('.LeftSearch')
    document.querySelector('.see-filter-mobile').addEventListener('click', () => {
      menuLeft.classList.add('open-menu-filter-search')
      document.querySelector('body').style.overflow = 'hidden'        
    })
    document.querySelector('.close-menu-filter-search').addEventListener('click', () => {
      menuLeft.classList.remove('open-menu-filter-search')
      document.querySelector('body').style.overflow = 'auto'    
    })
  }, [])

  async function filterPrice() {
    var minPrice = document.querySelector("#min-price").value
    var maxPrice = document.querySelector("#max-price").value

    setFilters({
      minPrice: minPrice.length === 0 ? 0 : minPrice,
      maxPrice: maxPrice.length === 0 ? 0 : maxPrice
    })
  }


  //Pagination with React
  function next() {
    if (count < Math.ceil(countPages/9)) setCount(count + 1)
  }
  function prev() {
    if (count > 1) setCount(count - 1)
  }


  return (
    <div className="SearchPage">
      <div className="TopFilter">
        <div className="d-flex flex-row mt-4 header-page-search">
          <div className="text-white pe-5 d-flex iconsNavigate mobile">
            <span className="material-icons-outlined iconNavigateSearch">home</span> Home
            <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> Pesquisa
            <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> { value }
          </div>
          
          <h4 className="text-white titleSearch w-100">
            Encontre o Produto perfeito para você!
          </h4>

          <div className="text-white pe-5 d-flex iconsNavigate desktop">
            <span className="material-icons-outlined iconNavigateSearch">home</span> Home
            <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> Pesquisa
            <span className="material-icons-two-tone iconNavigateSearch">navigate_next</span> { value }
          </div>
        </div>
      </div>


      <div className="ContentSearch d-flex flex-box">
        <div className="LeftSearch">
        <div className="material-icons-outlined close-menu-filter-search text-end w-100">close</div>
          
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
            <button className="btn btn-success mt-3" onClick={filterPrice}>Aplicar</button> <br/>
            <div className="error_msgSearch">{Erros.length > 0 ? Erros[0] : ""}</div>
          </div>

          <hr className="mt-3 mb-3"/>
        </div>
        <div className="container searchContentResult">
          <div className="FilterTop d-flex">
            <div>
              <span className="text-white pe-2 details-quant-search">Ordenar por: </span>
              <select className="optionsFilter">
                <option>Popular</option>
                <option>Preço - Menor para o Maior</option>
                <option>Preço - Maior para o Menor</option>
                <option>Melhores avaliações</option>
                <option>A - Z</option>
                <option>Z - A</option>
              </select>
              <span className="ps-2 text-white details-quant-search"> de {countPages} produtos</span>
            </div>

            <div className=" d-flex ps-5 monitor-pages-search">
              <span className="material-icons-outlined backPageSearch" onClick={() => prev()}>arrow_back_ios</span>
              <span className="pageSearchIndex"> {count} / {Math.ceil(countPages/9)} </span>
              <span className="material-icons-outlined nextPageSearch" onClick={() => next()}>arrow_forward_ios</span>
            </div>
          </div>
          <div className="see-filter-mobile container">Ver filtros</div>
          <div className="ResultProducts">
            {
              searchResult.length === 0
                ? <h1 className="noResult">Nenhum Result encontrado para Pesquisa: {value}</h1>
                : searchResult.map((product) => {
                  return(
                    <Card title={product.product_name} price={product.price} cover={product.cover} key={product.id} id={product.id}/>
                  )
                })
            }
          </div>
          <div className="search-loading"><img src={ LoadingGIF } alt="Loading GIF" /></div>
        </div>
      </div>
      <div className="search-loading-page"></div>
    </div>
  )
}
