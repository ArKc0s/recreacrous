import express, { json, request, response } from "express";
import mongoose from "mongoose"

// execute : dans le terminal : node server.js

mongoose.connect("mongodb://localhost:27017/test").then((e)=>{
    console.log("Connected to MongoDB")
}).catch((e) =>{
    console.log("Error while connecting to MongoDB")
})

// Create models
// const Game = mongoose.model("Game", {Name: String, Price: Number, Rating: Number, Description: String, Duration: Number, MinPlayer: Number, MaxPlayer: Number, Category: String, Editor: String, Year: Number});

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    Name: String,
    Price: Number,
    Rating: Number,
    Description: String,
    Duration: Number,
    MinPlayer: Number,
    MaxPlayer: Number,
    Category: String,
    Editor: String,
    Year: Number
});

const Games = mongoose.model("Games", gameSchema);

// Create a new game
var dataGames = [
    {Name: "Azul", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Plan B Games", Year: 2017},
    {Name: "7 Wonders", Price: 30, Rating: 8, Description: "Un jeu de stratégie", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2010},
    {Name: "Monopoly", Price: 30, Rating: 8, Description: "Un jeu de plateauu et d'investissement", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Hasbro", Year: 1935},
    {Name: "Catan", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 1995},
    {Name: "Puerto Rico", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2002},
    {Name: "Ticket to Ride", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Days of Wonder", Year: 2004},
    {Name: "Terraforming Mars", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2016},
    {Name: "Pandemic", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2008},
    {Name: "Codenames", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2015},
    {Name: "Splendor", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2014},
    {Name: "7 Wonders Duel", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2015},
    {Name: "Dominion", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2008},
    {Name: "Kingdomino", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2016},
    {Name: "Colt Express", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2015},
    {Name: "Arkham Horror", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2005},
    {Name: "Mysterium", Price: 30, Rating: 8, Description: "Un jeu de placement de tuiles", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2015},
]

Games.insertMany(dataGames).then((e)=>{
    console.log("Data inserted")
}).catch((e) =>{
    console.log("Error while inserting data")
});

// Création du serveur et initialisation
const app = express()
app.use(json())

// Récupérer tous les jeux
app.get("/games", (request, response) => {
    Games.find()
    .then((games) => {response.send(games)})
    .catch(() => response.status(404).end())
})

// Récupérer un jeu
app.get("/game/:id", (request, response) => {
    Games.findById(request.params.id)
    .then((game) => {response.send(game)})
    .catch(() => response.status(404).end())
})

// Ajouter un jeu
app.post("/game", (request, response) => {
    const game = new Games(request.body)
    game.save().then((game) => { response.send(game)})
})

// Modifier un jeu
app.put("/games/:id", (request, response) => {
    Games.findByIdAndUpdate(request.params.id, request.body)
    .then(() => {response.sendStatus(200)})
    .catch(() => response.status(404).end())
})

// Supprimer un jeu
app.delete("/games/:id", (request, response) => {
    Games.findByIdAndDelete(request.params.id)
    .then(() => {response.sendStatus(200)})
    .catch(() => response.status(404).end())
})

// Lancement du serveur
app.listen(3000, () => {
    console.log(`Started server at http://localhost: ${3000}`)
})