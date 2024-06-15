//var edad = 25

//if(edad >= 18){ 
   // console.log("puede votar")
//}
//else{ 
//console.log("no pude votar")
//}

// Conguracion de express
const express = require('express') // Importando la libreria
const app = express() // Inicializamos la variable de la libreria
const port = 3000 // Definimos el puerto a usar

const mongoose = require('mongoose');


require('dotenv').config()
const DB_CONNECTION = process.env.DB_CONNECTION || ''
mongoose.connect(DB_CONNECTION)

const cors = require('cors')
app.use(cors());


app.use (express.urlencoded({extended:true}))
app.use (express.json())
const UserRoutes = require('./routes/UserRoutes')
app.use('/', UserRoutes)

const CarroRoutes = require('./routes/CarroRoutes')
app.use('/', CarroRoutes)






// Creando el servicio web
// Funcionalidad de nuestra API
// [get, post, put, patch, delete]
// res -> Response -> Respuesta
// req -> Request  -> Informacion de entrada
app.get('/', (req, res) => {
    // Muestra en pantalla Hello world
    res.send("Hello world")
})

/** Servicio web */
app.get('/saludar', (req, res) => {
    res.send("hola")
})
/** Servicio web */
app.get('/despedirse', (req, res) => {
    res.send("adios")
})
// Servicio web con parametros
app.get('/saludar/:nombre', (req, res) => {
    // Recibiendo un parametro de la URL
    var nombre = req.params.nombre
    res.send("hola " + nombre)
})

app.get('/saludar/:nombre/:edad', (req, res) => {
    var nombre = req.params.nombre
    var edad = req.params.edad
    res.send("hola, me llamo " + nombre + " y tengo " + edad)
})

app.get('/mascota/:tipo', (req, res) => {
    var tipo = req.params.tipo
    var animal = ""
    if(tipo == "perro"){
        animal = "guau"
    }else if(tipo == "gato"){
        animal = "miau"
    }else if(tipo == "pajaro"){
        animal = "pio pio"
    }else if(tipo == "serpiente"){
        animal = "zsssssss"
    }else {
        animal = "No conozco el animal"
    }
    res.send(animal)
})
// Solicitud get
app.get('/usuario', (req, res) => {
    res.send("Estoy consultando un usuario")
})
// Solicitud por post
app.post('/usuario', (req, res) => {
    res.send("Estoy creando un usuario")
})
// Solicitud por PUT
app.put('/usuario', (req, res) => {
    res.send("Estoy actualizando un usuario con PUT")
})
//Solicitud por PATCH
app.patch('/usuario', (req, res) => {
    res.send("Estoy actualizando un usuario con PATCH")
})
app.delete('/usuario', (req, res) => {
    res.send("Estoy eliminando un usuario")
})

// Ejecutamos el servidor
app.listen(port, () => {
    console.log("Listen on " + port)
})