const express = require ('express');
const cors = require ('cors');
const routes = require ('./routes');

const app = express();

app.use(express.json());
app.use(cors()); //adicionar { origin: 'http://meusite.com'; } caso o mesmo seja colocado em produção
app.use(routes);

app.listen(3333);

console.log("Servidor aberto em: http://localhost:3333");