import swaggerAutogen from "swagger-autogen";

const output = "./swaggerDoc.json";
const routes = ["./server.ts"];
const doc = {
    info: {
        title: 'API Gestor de Frotas',
        description: 'API para controle de frotas de veículos',
      },
    tags: [                   // by default: empty Array
        {
            name: 'Veículos',
            description: 'Controle de Veículos'
        },
        {
            name: 'Setores',
            description: 'Controle de Setores'
        }
    ],
      host: 'localhost:3000'
}


swaggerAutogen(output, routes, doc);