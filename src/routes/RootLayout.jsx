import { Outlet } from 'react-router-dom'
import { useState, useContext } from 'react'

import Header from '../components/Header'
import Input from '../components/Input'
import Footer from '../components/Footer'
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
        // message: `You are a skilled chef with knowledge of delicious cuisines from around the world. Please generate a delicious recipe using the following ingredients: ${ingredientInput}. The recipe should only include these ingredients, along with spices for seasoning. Please do not add any extra ingredients beyond what I listed. I would like you to provide quantities, step-by-step directions, prep and cook time, and serving size. Thank you!`,
        message: `As a skilled chef with knowledge of delicious cuisines from around the world, I need your expertise to create a mouthwatering recipe using the following ingredients: ${ingredientInput}. Please keep in mind that I am looking for a recipe that beautifully combines these ingredients while ensuring a delightful taste experience, please do not add any extra ingredients beyond what I listed.

        It is essential that the recipe incorporates the provided ingredients and any spices or seasonings to bring out their flavors. I encourage you to explore various cooking methods and techniques that will enhance the taste and texture of the final dish.
        
        Furthermore, please include the recipe title, relevant cooking and preparation times, serving sizes, and step-by-step directions. Thank you!`,
        ingredients: ingredientInput
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      // const response = await fetch('http://localhost:3005/completions', options)
      const response = await fetch('https://foodx-server-ccgv.onrender.com/completions', options)
      const data = await response.json()
      console.log(data)
      setIngredientInput('')
      if (data.choices && data.choices.length > 0) {
        setRecipeResponse(data.choices[0].message.content)
      } else {
        setRecipeResponse("Sorry! An error occured, hit 'close'.")
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
      <Footer/>
      <Outlet />
    </>
  )
}

export default RootLayout
