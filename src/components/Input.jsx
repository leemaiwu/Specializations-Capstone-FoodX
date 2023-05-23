import { useRef, useState, useEffect } from "react"
import { IoSearchOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import styles from "./Input.module.css"

function Input({ ingredientInput, submitHandler, setIngredientInput }) {

  const inputRef = useRef(null)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [emptyInput, setEmptyInput] = useState(false)
  const navigate = useNavigate()

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

  const emptyHandler = (e) => {
    e.preventDefault()
    if (ingredientInput === '') {
      setEmptyInput(true)
      setTimeout(() => setEmptyInput(false), 3000)
    } else {
      submitHandler()
      navigate('/recipe')
    }
  }

  return (
    <div className={styles.inputsection}>
      <form onSubmit={emptyHandler}>
        <div className={styles.searchinput}>
          <IoSearchOutline size={23} style={{ color: "#ffffffaa" }} />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholderPhrases[currentTextIndex]}
            className={styles.input}
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            required
          ></input>
          <div className={styles.buttons}>
            <button type="submit" className={styles.searchbtn} onClick={emptyHandler}>Go</button>
          </div>
        </div>
      </form>
      {emptyInput && (
        <p className={styles.errorBox}>Oops! Missing ingredients</p>
      )}
    </div>
  )
}

export default Input
