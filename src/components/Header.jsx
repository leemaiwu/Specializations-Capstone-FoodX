import { useState, useEffect, useRef } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { FaGripfire } from "react-icons/fa"
import styles from './Header.module.css'

function Header() {

    const [showMenu, setShowMenu] = useState(false)
    const headerRef = useRef(null)

    useEffect(() => {
        const headerElement = headerRef.current;
        headerElement.classList.add(styles['fade-in']);
    }, [])

    const toggleMenu = () => {
        setShowMenu(((prevMenuState) => !prevMenuState))
    }

    return (
        <div>
            <div onClick={toggleMenu}>
                <AiOutlineMenu className={styles.menuIcon} />
            </div>
            {showMenu && (
                <div className={styles.menuInfo}>
                    <h3>Welcome to Food Expert!</h3>
                    <h4>- Your Personalized Recipe Generator -</h4>
                    <p>Simply input ingredients you have on hand, and our AI-powered system will generate a delicious recipe tailored just for you.</p>
                </div>
            )}
            <div ref={headerRef} className={styles.header} >
                <FaGripfire className={styles.icon} />
                <h1 className={styles.title} >FoodX</h1>
            </div>
        </div>
    )
}

export default Header
