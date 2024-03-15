import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { Motorista } from "@prisma/client";

const motoristaRouter = Router();
const prisma = new PrismaClient();

motoristaRouter.get("/", async (req, res) => {
    // #swagger.tags = ['Motoristas']
    const motoristas: Motorista[] = await prisma.motorista.findMany({
        include: {
            setor: true,
        }
    });
    return res.json(motoristas);
});

motoristaRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const motorista: Motorista | null = await prisma.motorista.findUnique({
        include: {
            setor: true,
        },
        where: {
            id: Number(id),
        },
    });
    if (!motorista) {
        return res.status(404).json({ error: "Motorista não encontrado" });
    }
    return res.json(motorista);
});

