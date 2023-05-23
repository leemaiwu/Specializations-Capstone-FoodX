import { createContext } from "react"
import { useState } from "react"

const RecipeContext = createContext()

export const RecipeContextProvider = ({children}) => {
    const [recipeResponse, setRecipeResponse] = useState(null)

    return (
        <RecipeContext.Provider value={{recipeResponse, setRecipeResponse}}>
            {children}
        </RecipeContext.Provider>
    )
}

export default RecipeContext
