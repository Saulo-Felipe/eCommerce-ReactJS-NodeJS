import React, { useEffect, useState } from 'react'
import './S-Accordion.css'
import api from '../../../services/api'

export default function Accordion() {
  const [categories, setCategory] = useState([])

  async function handleSearchCategory(Value) {
    var categorySearch = await api.post('/search/filter-category', { inputValue: Value.target.value })
    setCategory([categorySearch])
  }

  return (
    <>
      <div class="accordion accordion-flush" id="accordionFlushExample">

        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Sapatos
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <input className="form-control" type="text" placeholder="Pesquise uma por categorias" onChange={handleSearchCategory} />
              {
                categories.length === 0
                ? <div>Nenhuma Categoria Enocntrada</div>
                : categories.map((category) => {
                  return (<div>{category.data.result[0].category_name}</div>)
                })
              }
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
          </div>
        </div>

      </div>
    </>
  )
}
