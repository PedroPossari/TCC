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
            $nome: 'Nome do setor'
        }                        
    } 
    */
    const { nome }: Setor = req.body;
    const novoSetor: Setor = await prisma.setor.create({
        data: {
            nome: nome,
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
            $nome: 'Nome do setor'
        }                        
    } 
    */
    const { id } = req.params;
    const { nome }: Setor = req.body;
    const setorExiste = await prisma.setor.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!setorExiste) {
        return res.status(404).json({ error: 'Setor não encontrado' });
    }
    const setorAtualizado: Setor = await prisma.setor.update({
        where: {
            id: Number(id),
        },
        data: {
            nome: nome,
        },
    });
    return res.json(setorAtualizado);
});

setorRouter.delete('/:id', async (req, res) => {
    // #swagger.tags = ['Setores']
    const { id } = req.params;
    const setorExiste = await prisma.setor.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!setorExiste) {
        return res.status(404).json({ error: 'Setor não encontrado' });
    }
    await prisma.setor.delete({
        where: {
            id: Number(id),
        },
    });
    return res.sendStatus(204);
});

export default setorRouter;
