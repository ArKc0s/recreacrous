import express, { json, request, response } from "express";
import mongoose from "mongoose"

// execute : dans le terminal : node server.js

mongoose.connect("mongodb://localhost:27017/test").then((e)=>{
    console.log("Connected to MongoDB")
}).catch((e) =>{
    console.log("Error while connecting to MongoDB")
})

// Create models
const Game = mongoose.model("Game", {Name: String, Price: Number, Rating: Number, Description: String, Duration: Number, MinPlayer: Number, MaxPlayer: Number, Category: String, Editor: String, Year: Number});

const gameToSave = new Game({Name: "Monopoly", Price: 20, Rating: 4, Description: "Jeu de société", Duration: 120, MinPlayer: 2, MaxPlayer: 4, Category: "Société", Editor: "Hasbro", Year: 1935});

gameToSave.save().then((e)=>{
    console.log("Game saved");
}).catch((e) =>{
    console.log("Error while saving game");
})


// Création du serveur et initialisation
const app = express()
app.use(json())

// Récupérer tous les jeux
app.get("/games", (request, response) => {
    Game.find().then((games) => {
        response.send(games)
    })
})

// Récupérer un jeu
app.get("/games/:id", (request, response) => {
    Game.findById(request.params.id).then((game) => {
        response.send(game)
    })
})

// Ajouter un jeu
app.post("/games", (request, response) => {
    const game = new Game(request.body)
    game.save().then((game) => {
        response.send(game)
    })
})

// Modifier un jeu
app.put("/games/:id", (request, response) => {
    Game.findByIdAndUpdate(request.params.id, request.body).then(() => {
        response.sendStatus(200)
    })
})

// Supprimer un jeu
app.delete("/games/:id", (request, response) => {
    Game.findByIdAndDelete(request.params.id).then(() => {
        response.sendStatus(200)
    })
})


// Lancement du serveur
app.listen(3000, () => {
    console.log(`Started server at http://localhost: ${3000}`)
})