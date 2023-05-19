import RecipeCard from '../components/RecipeCard'
import styles from './Recipe.module.css'

function Recipe() {

    return (
        <>
            <div className={styles.recipeLayout}>
                <RecipeCard />
            </div>
        </>
    )
}

export default Recipe
