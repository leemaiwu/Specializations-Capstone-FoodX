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
  
    const elements = Array.from(section.querySelectorAll('p, ul li'))
    const lines = []
  
    elements.forEach((element) => {
      const tagName = element.tagName.toLowerCase()
      const text = element.textContent.trim()
  
      if (tagName === 'p' && text !== '') {
        const wrappedLines = pdf.splitTextToSize(text, 180)
        lines.push(...wrappedLines, '')
      } else if (tagName === 'li' && text !== '') {
        lines.push(text)
      }
    })
  
    pdf.text(lines, 10, 20)
    pdf.save('foodx_recipe.pdf')
  }

  return (
    <Modal>
        <section ref={sectionRef} className={styles.recipeCard} >
          <p>How about making a flavorful and healthy Tofu Stir-Fry with Broccoli? Here's the recipe:</p>
          <p>Ingredients:</p>
          <ul className={styles.ingredients}>
              <li>14 oz (400g) firm tofu, drained and cubed</li>
              <li>1 medium onion, thinly sliced</li>
              <li>3 cloves of garlic, minced</li>
              <li>2 cups of broccoli florets</li>
              <li>3 eggs, beaten</li>
              <li>2 green onions, chopped (for garnish)</li>
              <li>2 tablespoons of vegetable oil</li>
              <li>3 tablespoons of soy sauce</li>
              <li>1 tablespoon of oyster sauce (optional)</li>
              <li>Salt and pepper to taste</li>
          </ul>
          <p>Directions</p>
          <p>Heat 1 tablespoon of vegetable oil in a large skillet or wok over medium-high heat.
          Add the tofu cubes to the skillet and cook for about 5-7 minutes, stirring occasionally, until they are golden and slightly crispy on the outside. Remove the tofu from the skillet and set it aside.
          In the same skillet, add the remaining tablespoon of vegetable oil and heat it over medium heat.
          Add the sliced onion and minced garlic to the skillet, and stir-fry for 2-3 minutes until the onion becomes translucent.
          Add the broccoli florets to the skillet and stir-fry for another 3-4 minutes until they are tender-crisp.
          Push the onion, garlic, and broccoli to one side of the skillet, and pour the beaten eggs onto the other side.
          Scramble the eggs until they are cooked, and then mix them with the vegetables.
          Return the cooked tofu to the skillet and stir everything together.
          In a small bowl, whisk together the soy sauce and oyster sauce (if using). Pour the sauce mixture over the tofu and vegetables, and stir to coat everything evenly. Season with salt and pepper to taste.
          Cook for another 1-2 minutes, until everything is heated through.
          Remove the skillet from heat, and garnish the stir-fry with chopped green onions.
          </p>
          <p>Prep time: 15 minutes | 
          Cook time: 15-20 minutes | 
          Serves: 3-4</p>
          <p>Enjoy your flavorful Tofu Stir-Fry with Broccoli! You can serve it over steamed rice or noodles for a complete meal.</p>
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
