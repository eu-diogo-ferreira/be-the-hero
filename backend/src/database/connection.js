const knex = require('knex');
const configuration = require('../../knexfile');

//escolhendo a configuração da minha conexão
const connection = knex(configuration.development);

module.exports = connection;