import React, { useState, useEffect } from 'react'
import './S-AddCategory.css'
import api from '../../../services/api'

export default function AddCategory() {

	const [Allcategory, setAllCategories] = useState([])
	const [modalBody, setModalBody] = useState({})
	const [informations, setInformations] = useState()

	useEffect(() => {
		document.querySelector('#category').addEventListener('keyup', (event) => {
	      if (event.keyCode === 13)  {
	      	submitNewCategory()
	      	refreshCategories()
		   }
	    })
	    refreshCategories()
	}, []);

	async function submitNewCategory() {
		var category = document.querySelector('#category').value

		if (category === "" || category.length === 0) {
			setInformations("Preencha todos os campos")
		} else {
			var response = await api.post('/admin/new-category', {category})

			if (response.data.error)
				setInformations(response.data.error)
			else
				setInformations(response.data.message)
			refreshCategories()
		}
		setTimeout(() => {
			setInformations("")
		}, 2000)
	}


	async function refreshCategories() {
		var result = await api.post('/admin/categories')
		var response = result.data.result
		setAllCategories(response)
	}

	function modalDeleteCategory(id) {
		setModalBody({
			type: 'delete',
			content: `Deseja realmente exluir a caregoria de id ${id}? As alterações não serão desfeitas.`,
			title: "ATENÇÃO",
			btnSave: "Confirmar Exclusão",
			id: id
		})
	}
	async function modalUpdateCategory(id) {

		var response = await api.post('/admin/update-category', {id: id, type: "search id"})

		console.log(response)

		if (response.data.error) {
			alert(response.data.error)
		} else {
			setModalBody({
				type: 'update',
				content: <><label htmlFor="new-category-value">Novo nome:</label><input autoComplete="off" type="text" id="new-category-value" className="form-control" defaultValue={response.data.result}/></>,
				title: "Atualizar Categoria",
				btnSave: "Salvar alterações",
				id: id
			})
			document.querySelector('#new-category-value').value = response.data.result
		}
	}

	async function DeleteCategory() {
		var response = await api.post('/admin/delete-category', {id: modalBody.id})
		if (!response.data.error) 
			refreshCategories()
	}

	async function UpdateCategory() {
		var newNameCategory = document.querySelector('#new-category-value').value
		var response = await api.post('/admin/update-category', {id: modalBody.id, newValue: newNameCategory})

		if (!response.data.error)
			refreshCategories()
		else 
			alert(response.data.error)
	}

	async function searchCategory(change) {
		var category = change.target.value

		var response = await api.post('/admin/categories', { type: "especific category", category })

		setAllCategories(response.data.result)

	}

	return (
		<>
			<div className="AddCategory mt-5">	
				<div className="card container">
					<h4 className="mb-5">Adicione uma Categoria</h4>
					
					<label htmlFor="category">Nome da categoria</label>
					<input autoComplete="off" type="text" id="category" className="form-control" />
					<button className="btn btn-success category-submit-sucess mt-4" onClick={() => submitNewCategory()}>Adicionar Categoria</button>
					<div className="addCategorydefaultMessage text-center">{informations}</div>
				</div>
			</div>

			<div className="SeeAllCategory AddCategory mt-5">
				<div className="card container">
					<h5 className="d-flex flex-row input-title-search-category-add">
					<div>Categorias</div>
			        <div className="w-100 text-end container-input-search-category-add"><input autoComplete="off" type="text" className="search-Category" placeholder="Pesquise por uma categoria..." onChange={searchCategory}/></div>
					</h5>
					<div className="category-container">
						{
							Allcategory.length === 0 ?
							<h5>Nenhuma categoria encontrada</h5> :
							Allcategory.map( (item) =>
								<div key={item.id}>
									<div className="ListCategoryLine d-flex">
									    <div className="category-name-add">{item.category_name}</div>
									    <div className="updateANDdelete w-100 text-end">
									        <span class="material-icons text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => modalDeleteCategory(item.id)}>delete</span>
		                                    <span class="material-icons-outlined text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => modalUpdateCategory(item.id)}>update</span>
									    </div>
									</div>
									<hr className="mb-2" />
								</div>
							)
						}
					</div>
				</div>
			</div>

			<div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">{modalBody.title}</h5>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div class="modal-body modal-body-category">
			        {modalBody.content}
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
			        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={modalBody.type === 'delete' ? () => DeleteCategory() : () => UpdateCategory() }>{modalBody.btnSave}</button>
			      </div>
			    </div>
			  </div>
			</div>

		</>
	)
}