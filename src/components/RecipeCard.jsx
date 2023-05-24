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
            <p>
              Fetching your recipe... <br /> <br /> Rememeber, you are the chef! Alter your recipe as needed.
            </p>
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
