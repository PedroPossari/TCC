import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Veiculo } from "@prisma/client";

const veiculoRouter = Router();
const prisma = new PrismaClient();


// GET /veiculo
// Retorna todos os veículos
veiculoRouter.get("/", async (req, res) => {
    const veiculos: Veiculo[] = await prisma.veiculo.findMany({
        include: {
            setor: true,
        },
    });
    return res.json(veiculos);
});

// GET /veiculo/:id
// Retorna um veículo específico
veiculoRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const veiculo: Veiculo | null = await prisma.veiculo.findUnique({
        include: {
            setor: true,
        },
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
    return res.status(201).json(novoVeiculo);
});

// PUT /veiculo/:id
// Atualiza um veículo
veiculoRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    if(!await prisma.veiculo.findUnique({ where: { id: Number(id) } })) {
        return res.status(404).json({ error: "Veículo não encontrado" });
    }
    const veiculo: Veiculo = req.body;
    const veiculoAtualizado: Veiculo = await prisma.veiculo.update({
        include: {
            setor: true,
        },
        where: {
            id: Number(id),
        },
        data: veiculo,
    });
    return res.json(veiculoAtualizado);
});

// DELETE /veiculo/:id
// Deleta um veículo
veiculoRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const veiculoDeletado: Veiculo | null = await prisma.veiculo.delete({
        include: {
            setor: true,
        },
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
