import React, { useEffect } from 'react'
import { changeColorsOfSteps } from '../Checkout'
import './S-SubStep.css'


export default function Review() {

  useEffect(() => {
    changeColorsOfSteps(5)
  })

  return (
    <div>reviews aqui</div>
  )
}