import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { Setor } from '@prisma/client';

const setorRouter = Router();
const prisma = new PrismaClient();

setorRouter.get('/', async (req, res) => {
    // #swagger.tags = ['Setores']
    const setores: Setor[] = await prisma.setor.findMany();
    return res.json(setores);
});

setorRouter.get('/:id', async (req, res) => {
    // #swagger.tags = ['Setores']
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

setorRouter.post('/', async (req, res) => {
    /* 
    #swagger.tags = ['Setores']
    #swagger.parameters['Setor'] = {
        in: 'body',                                             
        required: true,                     
        schema: { 
            $nome: 'Nome do Setor'
        }                        
    } 
    */
    const { id, nome }: Setor = req.body;
    const novoSetor: Setor = await prisma.setor.create({
        data: {
            id,
            nome
        }
    });
    return res.status(201).json(novoSetor);
});

setorRouter.put('/:id', async (req, res) => {
    /* 
    #swagger.tags = ['Setores']
    #swagger.parameters['Setor'] = {
        in: 'body',                                            
        required: true,                     
        schema: { 
            $nome: 'Nome do Setor'
        }                        
    } 
    */
    const { id } = req.params;
    const { nome }: Setor = req.body;
    const setorAtualizado: Setor | null = await prisma.setor.update({
        where: {
            id: Number(id),
        },
        data: {
            nome
        }
    });
    if (!setorAtualizado) {
        return res.status(404).json({ error: 'Setor não encontrado' });
    }
    return res.json(setorAtualizado);
});

setorRouter.delete('/:id', async (req, res) => {
    // #swagger.tags = ['Setores']
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

export default setorRouter;
