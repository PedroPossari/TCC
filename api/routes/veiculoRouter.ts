import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const veiculoRouter = Router();
const prisma = new PrismaClient();

type Veiculo = {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    status: string;
    chassi: string;
    renavam: string;
    km: number;
    ano: number;
    cor: string;
    combustivel: string;
    categoriaCNH: string;
    dataLicenciamento: Date;
    numPatrimonio: number;
    setorId: number;
};

// GET /veiculo
// Retorna todos os veículos
veiculoRouter.get("/", async (req, res) => {
    const veiculos: Veiculo[] = await prisma.veiculo.findMany();
    return res.json(veiculos);
});

// GET /veiculo/:id
// Retorna um veículo específico
veiculoRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const veiculo: Veiculo | null = await prisma.veiculo.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (!veiculo) {
        return res.status(404).json({ error: "Veículo não encontrado" });
    }
    return res.json(veiculo);
});

// POST /veiculo
// Cria um novo veículo
veiculoRouter.post("/", async (req, res) => {
    const veiculo: Veiculo = req.body;
    const novoVeiculo: Veiculo = await prisma.veiculo.create({
        data: veiculo,
    });
    return res.json(novoVeiculo);
});

// PUT /veiculo/:id
// Atualiza um veículo
veiculoRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const veiculo: Veiculo = req.body;
    const veiculoAtualizado: Veiculo | null = await prisma.veiculo.update({
        where: {
            id: Number(id),
        },
        data: veiculo,
    });
    if (!veiculoAtualizado) {
        return res.status(404).json({ error: "Veículo não encontrado" });
    }
    return res.json(veiculoAtualizado);
});

// DELETE /veiculo/:id
// Deleta um veículo
veiculoRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const veiculoDeletado: Veiculo | null = await prisma.veiculo.delete({
        where: {
            id: Number(id),
        },
    });
    if (!veiculoDeletado) {
        return res.status(404).json({ error: "Veículo não encontrado" });
    }
    return res.json(veiculoDeletado);
});

export default veiculoRouter;
