import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
const app = express()
const PORT = 4000

dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        // origin: "http://localhost:5173",
        credentials: true

    })
)

console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
console.log('CALLBACK_URL:', process.env.CALLBACK_URL );


app.use(express.urlencoded({ extended: true }));

import passportGoogleAuth from "./authentication/passportGoogleAuth.js"
app.use(passportGoogleAuth.initialize())
app.get('/auth/google',
    passportGoogleAuth.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passportGoogleAuth.authenticate('google', { failureRedirect: 'http://localhost:5173/signin', session: false }),
    function (req, res) {
        console.log(req.user)

        const userData = req.user

        res.status(200).redirect(`http://localhost:5173/dashbord?user=${encodeURIComponent(JSON.stringify(userData))}`);
    });


import authRoutes from "./routes/auth.routes.js"
app.use("/api/auth", authRoutes)




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


app.listen(PORT, () => {
    console.log("http://localhost", PORT)

    mongoose.connect('mongodb://127.0.0.1:27017/notesapp').then(() => {
        console.log("Connected To DB")
    }).catch((error) => {
        console.log(error)
    })

})

