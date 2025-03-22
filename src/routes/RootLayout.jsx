import { useContext, useState } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Input from '../components/Input'
import { Outlet } from 'react-router-dom'
import RecipeContext from '../context/RecipeContext'
import styles from './RootLayout.module.css'

function RootLayout() {

  const [ingredientInput, setIngredientInput] = useState('')
  const { setRecipeResponse } = useContext(RecipeContext)

  const submitHandler = async (e) => {
    console.log(ingredientInput)
    
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: `As a skilled chef with knowledge of delicious cuisines from around the world, I need your expertise to create a mouthwatering recipe using only these ingredients: ${ingredientInput}. Please keep in mind that I am looking for a recipe that beautifully combines the ingredients while ensuring a delightful taste experience, please do not add any extra ingredients beyond what I listed.

        Please ensure that all the ingredients I provide are actually food. If any of the provided ingredients are material items, not food, or not sufficient enough for a recipe, please prompt me to enter sufficient ingredients.

        It is essential that the recipe incorporates the provided ingredients and any spices or seasonings to bring out their flavors. I encourage you to explore various cooking methods and techniques that will enhance the taste and texture of the final dish.
        
        Furthermore, please include the recipe title, relevant cooking and preparation times, serving sizes, and step-by-step directions. Thank you!`,
        // message: `As a skilled chef with accurate knowledge of delicious cuisines from around the world, I need your expertise to create a mouthwatering recipe using real and edible ingredients that I will provide below. Please ensure that all the ingredients I provide are suitable for human consumption. If any of the provided ingredients are not edible or real, please prompt me to enter valid edible ingredients.

        // It is essential that the recipe you give incorporates only the provided edible ingredients, you are absolutely not to add additional ingredients besides spices or seasonings to enhance flavors.

        // Using the edible ingredients below, please provide a recipe that beautifully combines these ingredients while ensuring a delightful taste experience. I encourage you to explore various cooking methods and techniques to enhance the taste and texture of the final dish.

        // Furthermore - please do not add any additional ingredients beyond what I list except spices or seasonings.
        // To ensure the safety and enjoyment of all, please note that any provided ingredients must be suitable for human consumption.

        // Finally, in your response, please only include the recipe title, cooking and preparation times, serving sizes, and step-by-step directions.
        
        // Here are the ingredients: ${ingredientInput}
        // `,
        ingredients: ingredientInput
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(options.body)
    try {
      // const response = await fetch('http://localhost:3005/completions', options)
      const response = await fetch('https://foodx-backend.onrender.com/completions', options)
      const data = await response.json()
      console.log(data)
      setIngredientInput('')
      if (data.choices && data.choices.length > 0) {
        setRecipeResponse(data.choices[0].message.content)
      } else {
        setRecipeResponse("Sorry! An error occured, try another recipe.")
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
