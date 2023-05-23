import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import Header from '../components/Header'
import Input from '../components/Input'
import styles from './RootLayout.module.css'

function RootLayout() {

  const [ingredientInput, setIngredientInput] = useState('')

  const submitHandler = async (e) => {
    console.log(ingredientInput)

    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: `You are a master chef who knows dishes from all around the world. I will provide you with ingredients that I have on hand and you will provide a recipe for a delicious dish from the list of ingredients I provide. You do not have to use everything from my list. But you will provide the quantity for the ingredients, detailed directions, prep and cook time, and how the dish serves. \n ${ingredientInput}`
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        console.log(data)
        setIngredientInput('')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <div className={styles.mainLayout}>
        <Header />
        <Input ingredientInput={ingredientInput} submitHandler={submitHandler} setIngredientInput={setIngredientInput} />
      </div>
      <Outlet />
    </>
  )
}

export default RootLayout
