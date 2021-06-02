import React, { useEffect } from 'react'
import './S-Dashboard.css'

export default function Dashboard() {

  useEffect(() => {
    var OpenMenu = document.querySelector(".open-menu")
    var menu = document.querySelector(".menuDashboard")

    OpenMenu.addEventListener("click", () => {
      if (getComputedStyle(menu, null).marginLeft == "-300px") {
        menu.style.marginLeft = "0px"
      } else {
        menu.style.marginLeft = "-300px"

      }
    })
  })

  return (
    <>
      <nav id="controlerMenuDashboard">
        <div className="menuDashboard">
          <div className="menu-open">
            <div className="LogotTipoDashboard">Logotipo here</div>
            <ul className="Options">
              <li>Home</li>
              <li>Mensagens</li>
              <li>Resultado de vendas do dia</li>
              <li>Gráficos de desempenho</li>
              <li>Filtrar Vendas</li>
            </ul>
            <div className="DashboardSaulo">&copy;Saulo</div>
          </div>
          <div className="configs">
            <span className="material-icons-outlined open-menu text-white">menu_open</span>
            <div className="iconsDashboard">
              <span class="material-icons-outlined">local_offer</span>
              <span class="material-icons-outlined">receipt_long</span>
              <span class="material-icons-outlined">archive</span>
            </div>
          </div>
        </div>
      </nav>
      <section id="Dashboard">
        <h1>Ok</h1>
      </section>
    </>
  )
}
