import express from 'express';
import cors from 'cors';
import veiculoRouter from "./routes/veiculoRouter";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/veiculo", veiculoRouter);

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});