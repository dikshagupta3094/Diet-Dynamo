import express from 'express'
import http from 'http'


//Server created
const app = express()
const server = http.createServer(app)

app.all('*',(req,res)=>{
    return res.status(404).send("Oops! Page not found")
})

export {app,server}