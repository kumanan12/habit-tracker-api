const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const PORT = 7000

app.use(express.json())
app.use(cors())

app.use('/habits', require('./router/habits'))

app.listen(PORT, () => console.log(`Habit tracker api running on ${PORT}`))
