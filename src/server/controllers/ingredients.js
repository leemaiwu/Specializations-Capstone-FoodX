const {Ingredients} = require('../models/ingredients')

module.exports = {
    sendIngredients: async (req, res) => {
        console.log(`Ingredients: ${req.body.ingredients}`)
        console.log(req.body.message)
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{
                    role: 'user',
                    content: req.body.message
                }],
                n: 1
            })
        }
        try {
            const ingredients = req.body.ingredients
            await Ingredients.create({ingredients})
            const response = await fetch('https://api.openai.com/v1/chat/completions', options)
            const data = await response.json()
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send('Oops! Server Error')
        }
    }
}
