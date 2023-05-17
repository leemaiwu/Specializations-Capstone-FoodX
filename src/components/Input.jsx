import { useRef } from "react"
import styles from "./Input.module.css"
import { IoSearchOutline } from "react-icons/io5"

function Input() {
  const inputRef = useRef(null)

  return (
    <div className={styles.inputsection}>
      <form>
        <div className={styles.searchinput}>
          <IoSearchOutline size={23} style={{ color: "#ffffffaa" }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="e.g. eggs, milk, flour"
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
