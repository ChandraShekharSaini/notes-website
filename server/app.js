import express from 'express'
const app = express()
const PORT = 3100


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
