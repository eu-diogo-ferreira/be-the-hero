const express = require('express');
const OngController = require('./controllers/ongController');
const IncidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/profileController');
const SessionController = require('./controllers/sessionController');

const routes = express.Router();

//-----Logins e Singouts-----
routes.post('/sessions', SessionController.create);

//-----Ongs-----
//Rota para listagen de Ongs
routes.get('/ongs', OngController.index);
//Rota para cadastro de Ongs
routes.post('/ongs', OngController.create);

//listando os incidents de determinda Ong, aquela que está logada
routes.get('/profile', ProfileController.index);

//-----Incidents-----
//Rota para listagen de Incidents
routes.get('/incidents', IncidentController.index);
//Rota para cadastro de Incidents
routes.post('/incidents', IncidentController.create);
//deletar um incdent com um 'routh param', ou seja, com um parametro especifico
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;