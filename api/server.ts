import express from 'express';
import cors from 'cors';
import veiculoRouter from "./routes/veiculoRouter";
import setorRouter from "./routes/setorRouter";
import motoristaRouter from './routes/motoristaRouter';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc.json';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/veiculos", veiculoRouter);
app.use("/setores", setorRouter);
app.use("/motoristas", motoristaRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
