

const express = require('express')
const app = express ()
const UsuarioController= require("../controllers/UsuarioController")
const controller= new UsuarioController();



app.get('/usuario',controller.getUsuarios)
app.post('/usuario',controller.createUsuario)
app.get('/usuario/:id',controller.getUsuarioById)
app.put('/usuario/:id',controller.updateUsuario)
app.delete('/usuario/:id',controller.deleteUsuario)
app.post('/login', controller.login)

module.exports = app
    
 

