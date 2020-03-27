const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        //aguardando a query
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs)
    },

    async create(request, response) {
    //desestrurando a minha request, para ter cada dado em cada variavel
    //impedindo dados indesejaveis
    const { name, email, whatsapp, city, uf } = request.body;

    //criando o meu 'id' com uma criptografia
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    //console.log(data);

    return response.json({
        //retornando apenas o   id  , pois ele é a identificação
        id
    });

    }
}