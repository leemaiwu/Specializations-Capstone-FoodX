import { Link } from 'react-router-dom'
import styles from './Modal.module.css'

function Modal() {
    
    return (
        <>
            <div className={styles.backdrop}/>
            <dialog className={styles.recipeCard}>
                <h1>TEST</h1>
                <ul className={styles.ingredients}>
                    <li>TEST</li>
                    <li>TEST</li>
                    <li>TEST</li>
                    <li>TEST</li>
                    <li>TEST</li>
                </ul>
                <p>Directions and ingredients</p>
                <p>fdsa fdsa fdsfdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fds fds afds afds afds a fdsa fdsa fdsafdsafdsa fdsa fds fdsa fdsa fds fdsafdsa fdsafdsafdsa fdsafdsa fdsa fdsafdsafdsa fdsafdsa fdsa fdsa fdsa fdsfdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fds fds afds afds afds a fdsa fdsa fdsafdsafdsa fdsa fds fdsa fdsa fds fdsafdsa fdsafdsafdsa fdsafdsa fdsa fdsafdsafdsa fdsafdsa fdsafdsa fdsa fdsfdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fds fds afds afds afds a fdsa fdsa fdsafdsafdsa fdsa fds fdsa fdsa fds fdsafdsa fdsafdsafdsa fdsafdsa fdsa fdsafdsafdsa fdsafdsa fdsafdsa fdsa fdsfdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fds fds afds afds afds a fdsa fdsa fdsafdsafdsa fdsa fds fdsa fdsa fds fdsafdsa fdsafdsafdsa fdsafdsa fdsa fdsafdsafdsa fdsafdsa fdsa
                </p>
                <Link to='..' type='button' className={styles.closeBtn} >Close</Link>
            </dialog>
        </>
    )
}

export default Modal
