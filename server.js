import express, { json, request, response } from "express";
import mongoose from "mongoose"
import bodyparser from "body-parser"

// execute : dans le terminal : node server.js

mongoose.connect("mongodb://user:1234@37.187.114.46:27017/recreacrous").then((e)=>{
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
    Year: Number,
    Image: String
});

const gamesincartSchema = new Schema({
    Name: String,
    Price: Number,
    Image: String,
    Quantity: {
        type : Number,
        default : 1
    }
});

const cartSchema = new Schema({
    games: [gamesincartSchema],
});

const Games = mongoose.model("Games", gameSchema);
const Cart = mongoose.model("Cart", cartSchema);

// Create a new game
// var dataGames = [
//     {Name: "Azul", Price: 30, Rating: 4.5, Description: "Azul vous place dans le rôle d’un chef décorateur chargé de poser des Azulejos dans le palais du roi Manuel 1er, au XVIe siècle. Chaque joueur dispose d’un plateau composé d’une piste de score, de lignes de motifs et d’un mur de palais.", Duration: 60, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Asmodee", Year: 2017, Image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/f2/77/d7/14120946/1540-1/tsp20221119013309/Jeu-de-strategie-Asmodee-Azul.jpg"},
//     {Name: "7 Wonders", Price: 47, Rating: 5, Description: "À la tête d’une grande Cité du monde antique, exploitez les ressources naturelles de vos terres, développez vos relations commerciales et affirmez votre suprématie militaire.", Duration: 60, MinPlayer: 2, MaxPlayer: 7, Category: "Stratégie", Editor: "Asmodee", Year: 2010, Image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/eb/1e/e6/15081195/1540-1/tsp20221121021049/7-wonders-nouvelle-edition.jpg"},
//     {Name: "Monopoly", Price: 30, Rating: 5, Description: "Les joueurs choisissent leur pion Monopoly préféré, le placent sur la case Départ et lancent les dés pour tout posséder.", Duration: 180, MinPlayer: 2, MaxPlayer: 6, Category: "Classique", Editor: "Hasbro", Year: 1935, Image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/64/a8/38/3713124/1540-1/tsp20221119100216/Jeu-de-societe-Hasbro-Gaming-Monopoly-Claique.jpg"},
//     {Name: "Catan", Price: 40, Rating: 5, Description: "Lancez-vous à la conquête d'une île vierge mais pleine de ressources. Saurez-vous construire vos villes et colonies plus vite que vos adversaires ? Construisez votre route vers la victoire !", Duration: 75, MinPlayer: 3, MaxPlayer: 4, Category: "Stratégie", Editor: "Kosmos", Year: 1995, Image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/bc/8c/38/3706044/1540-1/tsp20221118235118/ASMODEE-Catan-Jeu-de-societe.jpg"},
//     {Name: "Puerto Rico", Price: 30, Rating: 5, Description: "Un jeu de cartes", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Ravensburger", Year: 2002, Image: "https://static.fnac-static.com/multimedia/Images/FR/NR/d3/85/9d/10323411/1540-1/tsp20180802165948/PUERTO-RICO-JEU-DES-CARTES.jpg"},
//     {Name: "Aventuriers du rail", Price: 45, Rating: 5, Description: "La conquête ferroviaire au XIXe siècle et du début du XXe a toujours été un sujet particulièrement apprécié par les créateurs de jeu. Les aventuriers du rail est un jeu luxueux dans la droite ligne de Crique des Pirates ou de Meurtre à l'Abbaye.", Duration: 45, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Asmodee", Year: 2004, Image: "https://static.fnac-static.com/multimedia/Images/FR/NR/e4/c6/2c/2934500/1540-1/tsp20161012150538/Asmodee-Aventuriers-du-Rail-US.jpg"},
//     {Name: "Terraforming Mars", Price: 60, Rating: 5, Description: "La domestication de la Planète Rouge a commencé ! Les corporations sont en compétition pour transformer Mars en une planète habitable.", Duration: 60, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Jacob Fryxelius", Year: 2016, Image: "https://static.fnac-static.com/multimedia/Images/A5/A5/9C/56/5676197-1505-1540-1/tsp20210506221026/Jeu-de-plateau-Terraforming-Mars.jpg#d0e20b67-ddf0-4ab1-8a18-db517c45560a"},
//     {Name: "Pandemic", Price: 40, Rating: 5, Description: "Quatre maladies mortelles menacent l'avenir de la planète ! À la tête d'une équipe d'élite, vous parcourez le monde pour entraver la progression de l'infection et développer les ressources nécessaires pour découvrir les remèdes.", Duration: 60, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Repos Production", Year: 2008, Image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/0d/74/38/3699725/1540-1/tsp20221120134610/ASMODEE-Pandemic-Jeu-de-societe.jpg"},
//     {Name: "Codenames", Price: 22, Rating: 5, Description: "Codenames est un jeu d’association d’idées dans lequel les joueurs, répartis en deux équipes, devront tour à tour faire deviner à leurs coéquipiers un ensemble de mots qui leur sont attribués.", Duration: 15, MinPlayer: 2, MaxPlayer: 8, Category: "Ambiance", Editor: "iello", Year: 2015, Image: "https://static.fnac-static.com/multimedia/Images/FR/NR/c1/b8/78/7911617/1540-1/tsp20160826112220/Codenames-Iello.jpg"},
//     {Name: "Splendor", Price: 35, Rating: 5, Description: "Devenez le commerçant le plus prestigieux ! Avec des jetons symbolisant des pierres précieuses, achetez des cartes qui créeront de nouvelles ressources", Duration: 30, MinPlayer: 2, MaxPlayer: 4, Category: "Stratégie", Editor: "Asmodee", Year: 2014, Image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/9d/93/38/3707805/1540-1/tsp20220621153507/Jeu-de-strategie-et-de-gestion-Asmodee-Splendor.jpg"},
//     {Name: "Kingdomino", Price: 20, Rating: 5, Description: "Kingdomino est un jeu de dominos fluide et stratégique qui se prend en main en quelques minutes.", Duration: 15, MinPlayer: 2, MaxPlayer: 4, Category: "Domino", Editor: "Blue Orange", Year: 2016, Image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/28/93/38/3707688/1540-1/tsp20221119074113/Kingdomino.jpg"},
//     {Name: "Colt Express", Price: 35, Rating: 5, Description: "L’esprit des grands westerns dans un jeu de programmation original et subtil. Des cartes événement révélées au début de chaque manche introduisant nouvelles règles ou changements de situation.", Duration: 45, MinPlayer: 2, MaxPlayer: 4, Category: "Classique", Editor: "Blackrock Games", Year: 2015, Image: "https://static.fnac-static.com/multimedia/Images/28/28/9F/78/7905064-3-1541-3/tsp20221119011851/Jeu-de-reflexion-Asmodee-Colt-Expre.jpg"},
//     {Name: "Arkham Horror", Price: 70, Rating: 5, Description: "Nous sommes dans les années vingt, dans le Massachusetts. Mais pas les années vingt telles que nous connaissons. Dans cette réalité, des complots indicibles naissent dans l'ombre, fomentés par des adeptes fous à lier. ", Duration: 75, MinPlayer: 1, MaxPlayer: 6, Category: "Stratégie", Editor: "Asmodee", Year: 2005, Image: "https://static.fnac-static.com/multimedia/Images/FE/FE/81/A0/10519038-1505-1540-1/tsp20221119075229/Jeu-de-plateau-Asmodee-Horreur-a-Arkham-3eme-Edition-Boite-de-base.jpg"},
//     {Name: "Mysterium", Price: 45, Rating: 5, Description: "Vous faites partie d’une équipe de médiums qui doivent reconstituer les éléments d’un meurtre à travers les visions que vous envoie le fantôme.", Duration: 60, MinPlayer: 2, MaxPlayer: 7, Category: "Stratégie", Editor: "Asmodee", Year: 2015, Image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/ff/78/38/3700991/1540-1/tsp20221120134610/Jeu-d-ambiance-et-de-deduction-Asmodee-Mysterium.jpg"},
// ]

// Games.insertMany(dataGames).then((e)=>{
//     console.log("Data inserted")
// }).catch((e) =>{
//     console.log("Error while inserting data")
// });

// Création du serveur et initialisation
const app = express()
app.use(json())

// Affichage des jeux 

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


// Base de données des jeux

// Ajouter un jeu
app.post("/game", (request, response) => {
    const game = new Games(request.body)
    game.save().then((game) => { response.send(game)})
})

// Modifier un jeu
app.put("/game/:id", (request, response) => {
    Games.findByIdAndUpdate(request.params.id, request.body)
    .then(() => {response.sendStatus(200)})
    .catch(() => response.status(404).end())
})

// Supprimer un jeu
app.delete("/game/:id", (request, response) => {
    Games.findByIdAndDelete(request.params.id)
    .then(() => {response.sendStatus(200)})
    .catch(() => response.status(404).end())
})

// Panier

// Afficher le panier
app.get("/cart/:id", (request, response) => {
    Cart.findById(request.params.id)
    .then((cart) => {response.send(cart)})
    .catch(() => response.status(404).end())
})

// Ajouter un panier
// TODO
app.post("/cart", (request, response) => {
    const cart = new Cart(request.body)
    cart.save().then((cart) => { response.send(cart)})
})


// Ajouter un jeu au panier
app.post("/cart/:id/:gameid", async (request, response) => {
 
    const cart = await Cart.findByIdAndUpdate(request.params.id)
    let found = false

    cart.games.map(game => {
        if(game._id == request.params.gameid){
            found = true
            game.Quantity += 1
            cart.save()
            return response.send(cart)
        }
    })
    if (found == false){
        const gameincart = await Games.findById(request.params.gameid).select("Name Price Image")   
        gameincart.Quantity = 1
        cart.games.push(gameincart)
        await cart.save().then((cart) => { response.send(cart)})
    }
 
})


// Vider le panier
app.delete("/cart/:id", async (request, response) => {
    const cart = await Cart.findOneAndUpdate({id: request.params.id}, {games: []})
    .then(() => {response.sendStatus(200)})
    .catch(() => response.status(404).end())
})

// Supprimer un élément du panier
// TODO

app.delete("/cart/:id/:gameid", async (request, response) => {
    const cart = await Cart.findById(request.params.id)
    cart.games.map(game => {
        if(game._id == request.params.gameid){
            if (game.Quantity > 1){
                game.Quantity -= 1
                cart.save()
                return response.send(cart)
            }
            else{
                Cart.findOneAndUpdate({id: request.params.id}, {$pull: {games: {_id: request.params.gameid}}})
                .then(() => {response.sendStatus(200)})
                .catch(() => response.status(404).end())
            }
        }
    })
})

// Lancement du serveur
app.listen(3000, () => {
    console.log(`Started server at http://localhost: ${3000}`)
})