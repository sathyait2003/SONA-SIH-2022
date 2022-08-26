import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import dbConnect from './utils/database'

import caseRoute from './routes/case'
import userRoute from './routes/user'
import scriptRoute from './routes/script'
import healthRoute from './routes/health'
import testRoute from './routes/test'
import analyticsRoute from './routes/analytics'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

dbConnect()
    .then(() => console.log('Database connected.'))
    .catch((err) => console.log('Error in database connection: ', err))

app.use('/', healthRoute)
app.use('/test', testRoute)
app.use('/script', scriptRoute)
app.use('/case', caseRoute)
app.use('/user', userRoute)
app.use('/analytics', analyticsRoute)

app.listen(process.env.PORT, () => {
    console.log(`Mike Ross is up and running at PORT: ${process.env.PORT}`)
})