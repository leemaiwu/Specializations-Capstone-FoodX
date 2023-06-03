// const express = require('express')
// const cors = require('cors')

// const app = express()

// app.use(express.json())
// // app.use(cors())
// app.use(cors({ origin: 'https://foodx.onrender.com' }));

// require('dotenv').config()
// const PORT = process.env.PORT || 8000

// const {sendIngredients} = require('./controllers/ingredients')

// const {sequelize} = require('./util/database')

// app.post('/completions', sendIngredients)

// // sequelize.sync({force: true})
// sequelize.sync()
//     .then(() => {
//         app.listen(PORT, () => console.log(`Port running on ${PORT}`))
//     })
//     .catch((err) => {
//         console.log(err)
//         process.exit(1)
//     })

// ------------------- New -------------------

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

require('dotenv').config()
const PORT = process.env.PORT || 8000

const { sendIngredients } = require('./controllers/ingredients')

const { sequelize } = require('./util/database')

// Enable CORS preflight
app.options('/completions', cors())

app.post('/completions', sendIngredients)

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Port running on ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
