import { useRef, useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import RecipeContext from '../context/RecipeContext'
import Modal from './Modal'
import styles from './RecipeCard.module.css'

function RecipeCard({ingredientInput}) {

  const sectionRef = useRef()
  const navigate = useNavigate()

  const {recipeResponse, setRecipeResponse} = useContext(RecipeContext)
  const [ loading, setLoading ] = useState(!recipeResponse)

  // Other loading modal gifs
  // const gifLinks = [
  //   'https://drive.google.com/uc?export=view&id=1MZArw9g1XqHAKBYvbEzc6JkzKLdmwfCr',
  //   'https://drive.google.com/uc?export=view&id=1b9WNZ95bzHOlIFQ_136OySn9CRSgJEUp'
  // ]

  // const randomIndex = Math.floor(Math.random() * gifLinks.length)
  // const gifRandom = gifLinks[randomIndex]
  
  useEffect(() => {
    setLoading(!recipeResponse)
  }, [recipeResponse])

  const recipeLines = recipeResponse ? recipeResponse.split('\n') : []

  const handleDownload = () => {
    const section = sectionRef.current
    if (!section) return

    const pdf = new jsPDF()
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)

    const elements = Array.from(section.getElementsByTagName('p'))
    const lines = elements.map((element) => element.textContent.trim())

    const pageWidth = pdf.internal.pageSize.getWidth() - 20
    const wrappedLines = pdf.splitTextToSize(lines, pageWidth)

    pdf.text(wrappedLines, 10, 20)
    pdf.save('foodx_recipe.pdf')
  }

  const handleClearRecipe = (e) => {
    e.preventDefault()
    navigate('/')
    setRecipeResponse(null)
  }

  return (
<Modal>
      <section ref={sectionRef} className={styles.recipeCard}>
        <div className={styles.recipeText}>
          <p>{`Cooking with: ${ingredientInput}`}</p>
          <br />
          {loading ? (
            <>
              <p>
                Remember, you are the chef! Feel free to adjust the recipe to your preference.
              </p>
              <br />
              <img src={'https://drive.google.com/uc?export=view&id=1MZArw9g1XqHAKBYvbEzc6JkzKLdmwfCr'} alt="Loading" className={styles.gif} />
              <br />
              <br />
              <p>
                Fetching your recipe...
              </p>
              {/* <div className={styles.buttons}>
                <Link to="/" type="button" className={styles.firstcloseBtn} onClick={handleClearRecipe}>
                    Close
                </Link>
              </div> */}
            </>
          ) : (
            <>
              {recipeLines.map((line, index) => (
                <p key={index}>{line}<br /></p>
              ))}
              <div className={styles.buttons}>
                <Link to="/" type="button" className={styles.closeBtn} onClick={handleClearRecipe}>
                  Close
                </Link>
                <button onClick={handleDownload} className={styles.pdfBtn} >
                  Download as PDF
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </Modal>
  )
}

export default RecipeCard
