import React, { useEffect } from 'react'
import { changeColorsOfSteps } from '../Checkout'
import './S-SubStep.css'


export default function Shipping() {

  useEffect(() => {
    changeColorsOfSteps(3)
  })

  return (
    <div>shiiping aqui</div>
  )
}