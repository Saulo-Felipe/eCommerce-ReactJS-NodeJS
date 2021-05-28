import React from 'react'
// import './S-AddProduct.css'

export default function AddProduct() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="card">
          <h3 className="mt-3 ms-3">Novo Produto</h3>
          <div className="card-body">

            <form className="row g-3 needs-validation" novalidate>
              <div className="col-md-4">
                <label for="validationCustom01" className="form-label">Nome do Produto</label>
                <input type="text" className="form-control NameProduct" id="validationCustom01" required/>
                <div className="valid-feedback">
                  Tudo certo!
                </div>
              </div>

              <div className="col-md-4">
                <label for="validationCustomUsername" className="form-label">Preço do Produto</label>
                <div className="input-group has-validation">
                  <span className="input-group-text PriceProduto" id="inputGroupPrepend">R$</span>
                  <input type="number" min="1" step="any" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                  <div className="invalid-feedback">
                    Por favor insira um preço
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <label for="validationCustom03" className="form-label">Descrição do Produto</label>
                <textarea type="text" className="form-control DescriptionProduto" id="validationCustom03" placeholder="Fale um pouco o produto" required ></textarea>
                <div className="invalid-feedback">
                  Por favor digite algo aqui
                </div>
              </div>

              <div className="col-md-3">
                <label for="validationCustom04" className="form-label">Categoria</label>
                <select className="form-select" id="validationCustom04" required>
                  <option selected disabled value="">Escolha uma categoria</option>
                  <option>...</option>
                  <option>...</option>
                  <option>...</option>
                </select>
                <div className="invalid-feedback">
                  Por favor selecione uma categoria valida
                </div>
              </div>

              <div className="col-md-3">
                <label for="validationCustom05" className="form-label">Capa</label>
                <input type="file" className="form-control" id="validationCustom05" required />
                <div className="invalid-feedback">
                  Por favor envie uma imagem válida
                </div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                  <label className="form-check-label" for="invalidCheck">
                    Aceito os temos e condições
                  </label>
                  <div className="invalid-feedback">
                    Você precisa aceitar os termos
                  </div>
                </div>
              </div>

              <div className="col-12">
                <button className="btn btn-primary" type="submit">Finalizar Cadastro</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}
