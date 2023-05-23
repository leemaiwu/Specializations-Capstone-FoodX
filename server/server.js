const PORT=8000

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

require('dotenv').config()

const sentChat = 'flour, milk, quick oats, peanut butter, frozen berries'

app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `You are a master chef who knows dishes from all around the world. I will provide you with ingredients that I have on hand and you will provide a recipe for a delicious dish from the list of ingredients I provide. You do not have to use everything from my list. But you will provide the quantity for the ingredients, detailed directions, prep and cook time, and how the dish serves. \n ${sentChat}`,
            }],
            max_tokens: 100,
            n: 1,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

app.listen((PORT), () => console.log(`Port running on ${PORT}`))
