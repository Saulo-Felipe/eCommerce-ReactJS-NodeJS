import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './S-Dashboard.css'

export default function Dashboard() {

  const [iconClose, setIconClose] = useState('menu')

  useEffect(() => {
    console.log('entrou')
    document.querySelector('.admin-icon-close').addEventListener('click', () => {
       var resizeSection = document.querySelector('.admin-content-dashboard')
      var MobileNavBar = document.querySelector('.admin-menu-left')
      if (MobileNavBar.style.marginLeft === "0vw") {
        MobileNavBar.style.marginLeft = "-21vw"
        setIconClose('menu')
        resizeSection.style.width = "96vw"
      } else {
        MobileNavBar.style.marginLeft = "0vw"
        setIconClose('close')
        resizeSection.style.width = "75vw"
      }
      
    })
  }, [])

  return (
    <>
    <section>
      <nav className="admin-menu-left">
        <ul type="none" className="menu-admin">
          <Link to={"/admin/new-product"} className="no-href-decoration">
            <li className="admin-menu-alternative">Adicinar um novo Produto</li>
          </Link>
          <Link to={"/admin/new-category"} className="no-href-decoration">
            <li className="admin-menu-alternative">Adicionar uma Categoria</li>
          </Link>
        </ul>
        <div className="toggle-admin-menu">
          <button className="material-icons-outlined admin-icon-close btn">{iconClose}</button>
        </div>
      </nav>
      <section className="admin-content-dashboard">
        <h1>Dashboard content hereleiqowueowqueoqwueqwoieuiwqeuoqwuew</h1>
      </section>
    </section>
    </>
  )
}
