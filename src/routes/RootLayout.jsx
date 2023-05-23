import { Outlet } from 'react-router-dom'
import { useState, useContext } from 'react'

import Header from '../components/Header'
import Input from '../components/Input'
import styles from './RootLayout.module.css'
import RecipeContext from '../context/RecipeContext'

function RootLayout() {

  const [ingredientInput, setIngredientInput] = useState('')

  const { setRecipeResponse } = useContext(RecipeContext)

  const submitHandler = async (e) => {
    console.log(ingredientInput)

    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: `You are a master chef with recipes from all around the world. I will provide you with ingredients that I have on hand and you will provide a recipe for a delicious dish based on the ingredients I provide below. You do not have to include every ingredient from my list but you will not add more besides spices. You will be concise and to the point with your response. Provide quantities for all ingredients, detailed directions, prep and cook time, and serving size. My ingredients: ${ingredientInput}`
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
        console.log(data.choices[0].message.content)
        setRecipeResponse(data.choices[0].message.content)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <div className={styles.mainLayout}>
        <Header />
        <Input 
          ingredientInput={ingredientInput} 
          submitHandler={submitHandler} 
          setIngredientInput={setIngredientInput} 
        />
      </div>
      <Outlet />
    </>
  )
}

export default RootLayout
