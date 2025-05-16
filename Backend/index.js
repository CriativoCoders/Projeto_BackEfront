const express = require("express");
const cors = require('cors');

// Guardando express dentro do app 
const app = express();

// Corrigindo `user` para `use` no middleware
app.use(express.json());
// uso o cors para decidir quem pode acessar meu servidor
app.use(cors());

// Array de usuários
const users = [
    {
        name: 'Talita',
        age: 18,
    },
];

// Rota GET para listar usuários
app.get('/usuarios', function (request, response) {
    response.json(users);
});

// Rota POST para adicionar um novo usuário
app.post('/usuarios', function (request, response) {
    console.log(request.body);

    const newUser = request.body;

    users.push(newUser);

    response.status(201).json(newUser);
});

// Corrigindo `application` para `app` na inicialização do servidor
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
