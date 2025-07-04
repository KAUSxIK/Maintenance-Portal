import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD", // Specify the allowed origin
    credentials: true  // Allow credentials
}));



app.use(express.json({limit:"10kb"}))
app.use(express.urlencoded({extended:true,limit:"10kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// outes import

import userRouter from "./routes/user.routes.js"


// routes dec

app.use("/api/auth",userRouter)



export{app}