import styles from './Footer.module.css'

function Footer() {

    const currentYear = new Date().getFullYear()

    return (
        <div className={styles.footer}>
            <p>© FoodX {currentYear}</p>
        </div>
    )
}

export default Footer
