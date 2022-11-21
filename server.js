import express, { json, request, response } from "express";
import mongoose from "mongoose"

// execute : dans le terminal : node server.js

mongoose.connect("mongodb://localhost:27017/test").then((e)=>{
    console.log("Connected to MongoDB")
}).catch((e) =>{
    console.log("Error while connecting to MongoDB")
})


// création du serveur et initialisation
const app = express()
app.use(json())


// Lancement du serveur
app.listen(3000, () => {
    console.log(`Started server at http://localhost: ${3000}`)
})

