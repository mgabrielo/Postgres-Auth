import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import 'dotenv/config'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

const port = process.env.PORT

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})