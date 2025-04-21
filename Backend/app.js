import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import router from './routes/user.routes.js'
import captionroutes from './routes/caption.routes.js'
import maprouter from './routes/map.routes.js'
import ridesrouter from './routes/rides.routes.js'

const app= express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/get',(req,res)=>{
    res.send('hello')
})
app.use('/users',router);
app.use('/caption',captionroutes)
app.use('/map',maprouter);
app.use('/ride',ridesrouter)


export default app;