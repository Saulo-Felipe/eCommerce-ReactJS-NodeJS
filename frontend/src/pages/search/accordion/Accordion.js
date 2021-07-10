import React, { useEffect, useState } from 'react'
import './S-Accordion.css'
import api from '../../../services/api'

export default function Accordion() {
  const [categories, setCategory] = useState([])

  useEffect(() => { handleSearchCategory({target: {values: ''}}) }, []) //Atualiza as categorias ao load da page

  async function handleSearchCategory(Value) {
    var categorySearch = await api.post('/search/filter-category', { inputValue: Value.target.value || '' })
    setCategory(categorySearch.data.result)
  }

  return (
    <>
      <div className="accordion accordion-flush" id="accordionFlushExample">

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Sapatos
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
              <input autoComplete="off" className="form-control mb-2" type="text" placeholder="Pesquise uma por categorias" onChange={handleSearchCategory} />
              <div className="accordion-search-page-body">
                {
                  categories.length === 0
                  ? <div>Nenhuma Categoria Enocntrada</div>
                  : categories.map((category) => {
                    return (
                      <div key={category.id}>
                        <input autoComplete="off" className="d-inline me-2" type="checkbox" />
                        <div className="d-inline">{category.category_name}</div>                        
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
          </div>
        </div>

      </div>
    </>
  )
}
