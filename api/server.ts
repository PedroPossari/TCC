import express from 'express';
import cors from 'cors';
import veiculoRouter from "./routes/veiculoRouter";
import setorRouter from "./routes/setorRouter";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/veiculos", veiculoRouter);
app.use("/setores", setorRouter);

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});