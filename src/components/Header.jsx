import { useEffect, useRef } from 'react'
import styles from './Header.module.css'
import { FaGripfire } from "react-icons/fa"

function Header() {

    const headerRef = useRef(null)

    useEffect(() => {
        const headerElement = headerRef.current;
        headerElement.classList.add(styles['fade-in']);
    }, [])

    return (
        <div>
            <div ref={headerRef} className={styles.header} >
                <FaGripfire size='50' className={styles.icon} />
                <h1 className={styles.title} >FoodX</h1>
            </div>
            {/* <div className={styles.about}>
                <p>What are we cooking with today</p>
            </div> */}
        </div>
    )
}

export default Header
