const connection = require('../database/connection');
module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        //contando a quantidade total de registros
        const [count] = await connection('incidents').count();

        //console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['incidents.*',
         'ongs.name',
          'ongs.email',
           'ongs.whatsapp',
            'ongs.city',
             'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;//contexto da autenticação

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        //pegar o id que vem de dentro do request.params(parametro de rota)
        const { id } = request.params;
        //uscando o id da Ong logada (header)
        const ong_id = request.headers.authorization;

        //verificar se o 'id' do evento foi criado pelo 'id' de uma ong
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        //verificar se o id da Ong correspondente é diferente do id da Ong logada
        //chave estrangeira
        if(incident.ong_id != ong_id){
            //401 = não autorizado
            return response.status(401).json({error: 'Operation not permited. :|'});
        }

        //deletando do banco o incident 'id' de acordo com o id passado(relacionado ao id da ong)
        await connection('incidents').where('id', id).delete();

        //204 = retornando uma respota sem conteudo
        return response.status(204).send();
    }
};