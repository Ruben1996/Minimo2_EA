'use strict';

//Importar librerías
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const router = require('./routes');
const cors = require('cors');
const express = require('express');
const BodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app = express();
const api = require('./routes');

app.use(cors());
app.options('*',cors());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1', router);

//Método use
app.use(BodyParser.urlencoded({ extended: false}));

//Permitir peticiones con formato de mensaje JSON
app.use(BodyParser.json());

app.use('', api);

//Renderizar login
app.get('/login', (req, res) => {
    res.render('login')
});

module.exports = app;
