import React, { useEffect } from 'react'
import { changeColorsOfSteps } from '../Checkout'
import './S-SubStep.css'


export default function Pay() {

  useEffect(() => {
    changeColorsOfSteps(4)
  })

  return (
    <div>pays aqui</div>
  )
}