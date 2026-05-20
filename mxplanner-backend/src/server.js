const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'mxPlanner API dziala',
    endpoints: ['/api/auth/register', '/api/auth/login', '/api/tasks']
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message || 'Wystapil nieoczekiwany blad serwera.'
  })
})

app.listen(PORT, () => {
  console.log(`Server dziala na porcie ${PORT}`)
})
