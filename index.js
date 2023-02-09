const express = require("express");
const { MongoClient } = require("mongodb");


const DB_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "Ocean-bancodados-02-23";

async function main() {
//conexão com o banco de dados
console.log("conectando banco de dados...")
const client = await MongoClient.connect(DB_URL)
const db = client.db(DB_NAME);
const collection = db.collection("itens")
console.log("Banco de dados conectado com belo sucessinho, irmão!!")

const app = express();

// O que vier no body da requisição, está em JSON
app.use(express.json());

// Endpoint / -> Hello World
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Endpoint /oi -> Olá, mundo!
app.get("/oi", function (req, res) {
  res.send("Olá, mundo!");
});

// Lista de informações
const itens = ["Geter Tel", "Rick Sanchez", "Morty Smith", "Summer Smith"];
//              0               1              2

// CRUD -> Lista de informações

// Endpoint Read All -> [GET] /item
app.get("/item", async function (req, res) {
  const documentos = await collection.find().toArray();
  res.send(documentos);
});

// Endpoint Read Single by ID -> [GET] /item/:id
app.get("/item/:id", function (req, res) {
  const id = req.params.id;
  const item = itens[id - 1];
  res.send(item);
});

// Endpoint Create -> [POST] /item
app.post("/item", function (req, res) {
  //console.log(req.body);
  const item = req.body; 
  itens.push(item.nome) 
  res.send("item criado com sucesso");
});

app.listen(3000);
}


main();
