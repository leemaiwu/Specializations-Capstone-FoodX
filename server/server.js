
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

require('dotenv').config()
const PORT = process.env.PORT || 8000

app.post('/completions', async (req, res) => {
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
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

app.listen((PORT), () => console.log(`Port running on ${PORT}`))
