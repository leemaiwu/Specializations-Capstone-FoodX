import { useRef, useState, useEffect } from "react"
import styles from "./Input.module.css"
import { IoSearchOutline } from "react-icons/io5"

function Input() {

  const inputRef = useRef(null)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const placeholderPhrases = [
    'e.g. eggs, milk, flour',
    'What are we cooking with today?'
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === 0 ? 1 : 0
      )
    }, 3000)
    return () => clearTimeout(timeout)
  }, [currentTextIndex])

  return (
    <div className={styles.inputsection}>
      <form>
        <div className={styles.searchinput}>
          <IoSearchOutline size={23} style={{ color: "#ffffffaa" }} />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholderPhrases[currentTextIndex]}
            className={styles.input}
            required
          ></input>
        <div className={styles.buttons}>
            <button type="submit" className={styles.searchbtn}>Go</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default Input
