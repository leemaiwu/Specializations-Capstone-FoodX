import { useRef, useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import RecipeContext from '../context/RecipeContext'
import Modal from './Modal'
import styles from './RecipeCard.module.css'
import logo from '../logo/tinyLogo.png'

function RecipeCard({ingredientInput}) {

  const sectionRef = useRef()
  const navigate = useNavigate()

  const { recipeResponse, setRecipeResponse } = useContext(RecipeContext)
  const [loading, setLoading] = useState(!recipeResponse)
  
  useEffect(() => {
    setLoading(!recipeResponse)
  }, [recipeResponse])

  const recipeLines = recipeResponse ? recipeResponse.split('\n') : []

  const handleDownload = () => {
    const section = sectionRef.current
    if (!section) return

    const pdf = new jsPDF()
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(0, 0, 0)

    const appName = "FoodX Recipe"
    const textWidth = pdf.getTextWidth(appName)

    const pageWidth = pdf.internal.pageSize.getWidth()
    const centerX = (pageWidth - textWidth) / 2

    pdf.addImage(logo, 'PNG', 81, 8, 10, 10)
    pdf.text(appName, centerX + 2, 15)

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')

    const elements = Array.from(section.getElementsByTagName('p'))
    const lines = elements.map((element) => element.textContent.trim())

    const contentWidth = pdf.internal.pageSize.getWidth() - 20
    const wrappedLines = pdf.splitTextToSize(lines, contentWidth)

    pdf.text(wrappedLines, 10, 28)
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
              <p className={styles.chefMessage}>
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
