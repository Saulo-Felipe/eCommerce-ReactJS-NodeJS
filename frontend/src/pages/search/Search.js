import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './S-Search.css'
import api from '../../services/api'
import Card from '../../components/card/Card'

export default function Search() {
  let { value } = useParams()

  const [oldSearch, setSearch] = useState([])

  useEffect(() => {
    api.post("/search", {search: value}).then((response) => {
      setSearch(response.data.SearchProducts)
    }).catch("Ocorreu um erro inesperado")
  }, [value])

  return (
    <div className="container">
      {
        oldSearch.map((product) => {
          return (<Card title={product.Title} price={product.Price}/>)
        })
      }
    </div>
  )
}
