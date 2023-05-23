import RecipeCard from '../components/RecipeCard'
import { useParams } from 'react-router-dom'
import styles from './Recipe.module.css'

function Recipe({recipeResponse}) {

    const { ingredientInput } = useParams()

    return (
        <>
            <div className={styles.recipeLayout}>
                <RecipeCard ingredientInput={ingredientInput} recipeResponse={recipeResponse} />
            </div>
        </>
    )
}

export default Recipe
