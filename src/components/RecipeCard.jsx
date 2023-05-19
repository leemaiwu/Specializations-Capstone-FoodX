import { useRef } from 'react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import Modal from './Modal'
import styles from './RecipeCard.module.css'

function RecipeCard() {

  const sectionRef = useRef(null)

  const handleDownload = () => {
    const section = sectionRef.current
    if (!section) return
  
    const pdf = new jsPDF()
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 0)
  
    const elements = section.getElementsByTagName('*')
    let currentY = 20
    const lines = []
  
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      const tagName = element.tagName.toLowerCase()
  
      if (tagName === 'p') {
        const text = element.textContent.trim()
        if (text !== '') {
          const wrappedLines = pdf.splitTextToSize(text, 180)
          lines.push(...wrappedLines)
        }
      } else if (tagName === 'ul') {
        const listItems = element.getElementsByTagName('li')
        for (let j = 0; j < listItems.length; j++) {
          const listItem = listItems[j]
          const listItemText = listItem.textContent.trim()
          if (listItemText !== '') {
            lines.push(listItemText)
          }
        }
      }
    }
  
    pdf.text(lines, 10, currentY)
    pdf.save('foodx_recipe.pdf')
  }

  return (
    <Modal>
        <section ref={sectionRef} className={styles.recipeCard}>
          <p>Recipe Name</p>
          <ul className={styles.ingredients}>
              <li>ingredient</li>
              <li>ingredient</li>
              <li>ingredient</li>
              <li>ingredient</li>
              <li>ingredient</li>
          </ul>
          <p>Directions</p>
          <p>fdsa fdsa fdsfdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fds fds afds afds afds a fdsa fdsa fdsafdsafdsa fdsa fds fdsa fdsa fds fdsafdsa fdsafdsafdsa fdsafdsa fdsa fdsafdsafdsa fdsafdsa fdsa fdsa fdsa fdsfdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fds fds afds afds afds a fdsa fdsa fdsafdsafdsa fdsa fds fdsa fdsa fds fdsafdsa fdsafdsafdsa fdsafdsa fdsa fdsafdsafdsa fdsafdsa fdsafdsa fdsa fdsfdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fdsa fds fds afds afds afds a fdsa fdsa fdsafdsafdsa fdsa fds fdsa fdsa fds fdsafdsa fdsafdsafdsa fdsafdsa fdsa fdsafdsafdsa fdsafdsa fdsa.</p>
          <div className={styles.buttons}>
              <Link to=".." type="button" className={styles.closeBtn}>
              Close
              </Link>
              <button onClick={handleDownload} className={styles.pdfBtn}>Download as PDF</button>
          </div>
        </section>
    </Modal>
  )
}

export default RecipeCard
