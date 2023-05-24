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
        message: `You are a skilled chef with knowledge of cuisines from around the world. Please create a delicious recipe using the following ingredients: ${ingredientInput}. The recipe should only include these ingredients, along with spices for seasoning. Please do not add any extra ingredients beyond what I listed. I would like you to provide quantities, step-by-step directions, prep and cook time, and serving size. Thank you!`
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
      if (data.choices && data.choices.length > 0) {
        setRecipeResponse(data.choices[0].message.content)
      } else if (data.error && data.error.message) {
        setRecipeResponse(data.error.message)
      } else {
        setRecipeResponse(null)
      }
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
