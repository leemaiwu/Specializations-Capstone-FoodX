const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cors({ origin: 'https://foodx-server-ccgv.onrender.com' }))

require('dotenv').config()
const PORT = 3005

const {sendIngredients} = require('./controllers/ingredients')

const {sequelize} = require('./util/database')

app.post('/completions', sendIngredients)

// sequelize.sync({force: true})
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Port running on ${PORT}`))
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })

// ------------------- New -------------------

// const express = require('express')
// const cors = require('cors')
// const path = require('path')

// const app = express()

// app.use(express.json())
// app.use(cors())

// // Serve the static files from the frontend build folder
// const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'build')
// app.use(express.static(frontendBuildPath))

// require('dotenv').config()
// const PORT = 3005

// const { sendIngredients } = require('./controllers/ingredients')

// const { sequelize } = require('./util/database')

// app.post('/completions', sendIngredients)

// // Serve the index.html file for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendBuildPath, 'index.html'))
// })

// // sequelize.sync({force: true})
// sequelize
//   .sync()
//   .then(() => {
//     app.listen(PORT, () => console.log(`Port running on ${PORT}`))
//   })
//   .catch((err) => {
//     console.log(err)
//     process.exit(1)
//   })
