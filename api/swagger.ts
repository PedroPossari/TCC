import swaggerAutogen from "swagger-autogen";

const output = "./swaggerDoc.json";
const routes = ["./server.ts"];
const doc = {
    info: {
        title: 'API Gestor de Frotas',
        description: 'API para controle de frotas de veículos',
      },
      host: 'localhost:3000'
}


swaggerAutogen(output, routes, doc);