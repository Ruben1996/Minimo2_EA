'use strict'

//Constantes para "recuperar" la información
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, {useNewUrlParser: true }, (err, req) => {
    if (err) {
        return console.log(`Error al conectar a la BBDD: ${err}`)
    }
    console.log('Conexión a la BBDD establecida...')
})

//=> = callback function ()
app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
})