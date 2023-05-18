import { useEffect, useRef } from 'react'
import { FaGripfire } from "react-icons/fa"
import styles from './Header.module.css'

function Header() {

    const headerRef = useRef(null)

    useEffect(() => {
        const headerElement = headerRef.current;
        headerElement.classList.add(styles['fade-in']);
    }, [])

    return (
        <div>
            <div ref={headerRef} className={styles.header} >
                <FaGripfire className={styles.icon} />
                <h1 className={styles.title} >FoodX</h1>
            </div>
        </div>
    )
}

export default Header
