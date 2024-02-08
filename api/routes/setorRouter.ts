import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const setorRouter = Router();
const prisma = new PrismaClient();

type Setor = {
    id: number;
    nome: string;
};

// GET /setor
// Retorna todos os setores
setorRouter.get('/', async (req, res) => {
    const setores: Setor[] = await prisma.setor.findMany();
    return res.json(setores);
});

// GET /setor/:id
// Retorna um setor específico
setorRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const setor: Setor | null = await prisma.setor.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (!setor) {
        return res.status(404).json({ error: 'Setor não encontrado' });
    }
    return res.json(setor);
});

// POST /setor
// Cria um novo setor
setorRouter.post('/', async (req, res) => {
    const setor: Setor = req.body;
    const novoSetor: Setor = await prisma.setor.create({
        data: setor,
    });
    return res.json(novoSetor);
});

// PUT /setor/:id
// Atualiza um setor
setorRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const setor: Setor = req.body;
    const setorAtualizado: Setor | null = await prisma.setor.update({
        where: {
            id: Number(id),
        },
        data: setor,
    });
    if (!setorAtualizado) {
        return res.status(404).json({ error: 'Setor não encontrado' });
    }
    return res.json(setorAtualizado);
});

// DELETE /setor/:id
// Deleta um setor
setorRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const setorDeletado: Setor | null = await prisma.setor.delete({
        where: {
            id: Number(id),
        },
    });
    if (!setorDeletado) {
        return res.status(404).json({ error: 'Setor não encontrado' });
    }
    return res.json(setorDeletado);
});