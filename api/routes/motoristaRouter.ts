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
    // #swagger.tags = ['Motoristas']
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

motoristaRouter.post("/", async (req, res) => {
    /* 
    #swagger.tags = ['Motoristas']
    #swagger.parameters['Motorista'] = {
        in: 'body',                                             
        required: true,                     
        schema: { 
            $nome: 'Nome do motorista',
            $rg: 'RG do motorista',
            $cpf: 'CPF do motorista',
            $numCNH: 'Número da CNH do motorista',
            $validadeCNH: 'Validade da CNH do motorista',
            $categoriaCNH: 'Categoria da CNH do motorista',
            $setorId: 0
        }                        
    } 
    */
    const { nome, rg, cpf, numCNH, validadeCNH, categoriaCNH, setorId } = req.body;
    const novoMotorista: Motorista = await prisma.motorista.create({
        data: {
            nome: nome,
            rg: rg,
            cpf: cpf,
            numCNH: numCNH,
            validadeCNH: validadeCNH,
            categoriaCNH: categoriaCNH,
            setorId: setorId
        }
    });
    return res.status(201).json(novoMotorista);
});

motoristaRouter.put("/:id", async (req, res) => {
    /* 
    #swagger.tags = ['Motoristas']
    #swagger.parameters['Motorista'] = {
        in: 'body',                                             
        required: true,                     
        schema: { 
            $nome: 'Nome do motorista',
            $rg: 'RG do motorista',
            $cpf: 'CPF do motorista',
            $numCNH: 'Número da CNH do motorista',
            $validadeCNH: 'Validade da CNH do motorista',
            $categoriaCNH: 'Categoria da CNH do motorista',
            $setorId: 0
        }                        
    } 
    */
    const { id } = req.params;
    const { nome, rg, cpf, numCNH, validadeCNH, categoriaCNH, setorId } = req.body;
    const motoristaExiste = await prisma.motorista.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!motoristaExiste) {
        return res.status(404).json({ error: "Motorista não encontrado" });
    }
    const motoristaAtualizado: Motorista | null = await prisma.motorista.update({
        where: {
            id: Number(id),
        },
        data: {
            nome: nome,
            rg: rg,
            cpf: cpf,
            numCNH: numCNH,
            validadeCNH: validadeCNH,
            categoriaCNH: categoriaCNH,
            setorId: setorId
        }
    });
    return res.json(motoristaAtualizado);
});

motoristaRouter.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Motoristas']
    const { id } = req.params;
    const motoristaExiste = await prisma.motorista.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!motoristaExiste) {
        return res.status(404).json({ error: "Motorista não encontrado" });
    }
    return res.sendStatus(204);
});

export default motoristaRouter;