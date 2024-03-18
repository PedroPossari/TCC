import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Veiculo } from "@prisma/client";

const veiculoRouter = Router();
const prisma = new PrismaClient();

veiculoRouter.get("/", async (req, res) => {
    // #swagger.tags = ['Veículos']
    const veiculos: Veiculo[] = await prisma.veiculo.findMany({
        include: {
            setor: true,
        }
    });
    return res.json(veiculos);
});

veiculoRouter.get("/:id", async (req, res) => {
    // #swagger.tags = ['Veículos']
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

veiculoRouter.post("/", async (req, res) => {
    /* 
    #swagger.tags = ['Veículos']
    #swagger.parameters['Veiculo'] = {
        in: 'body',                                             
        required: true,                     
        schema: { 
            $placa: 'Placa do veículo',
            $marca: 'Marca do veículo',
            $modelo: 'Modelo do veículo',
            $tipo: 'Tipo do veículo',
            $status: 'Status do veículo',
            $chassi: 'Chassi do veículo',
            $renavam: 'Renavam do veículo',
            $km: 0,
            $ano: 0,
            $cor: 'Cor do veículo',
            $combustivel: 'Combustível do veículo',
            $categoriaCNH: 'Categoria de CNH para dirigir o veículo',
            $dataLicenciamento: 'Data do ultimo licenciamento do veículo',
            $numPatrimonio: 0,
            $setorId: 0
        }                        
    } 
    */
    const { placa, marca, modelo, tipo, status, chassi, renavam, km, ano, cor, combustivel, categoriaCNH, dataLicenciamento, numPatrimonio, setorId } = req.body;
    const novoVeiculo: Veiculo = await prisma.veiculo.create({
        data: {
            placa: placa,
            marca: marca,
            modelo: modelo,
            tipo: tipo,
            status: status,
            chassi: chassi,
            renavam: renavam,
            km: km,
            ano: ano,
            cor: cor,
            combustivel: combustivel,
            categoriaCNH: categoriaCNH,
            dataLicenciamento: dataLicenciamento,
            numPatrimonio: numPatrimonio,
            setorId: setorId
        }
    });
    return res.status(201).json(novoVeiculo);
});

veiculoRouter.put("/:id", async (req, res) => {
    /* 
    #swagger.tags = ['Veículos']
    #swagger.parameters['Veiculo'] = {
        in: 'body',                                             
        required: true,                     
        schema: { 
            $placa: 'Placa do veículo',
            $marca: 'Marca do veículo',
            $modelo: 'Modelo do veículo',
            $tipo: 'Tipo do veículo',
            $status: 'Status do veículo',
            $chassi: 'Chassi do veículo',
            $renavam: 'Renavam do veículo',
            $km: 0,
            $ano: 0,
            $cor: 'Cor do veículo',
            $combustivel: 'Combustível do veículo',
            $categoriaCNH: 'Categoria de CNH para dirigir o veículo',
            $dataLicenciamento: 'Data do ultimo licenciamento do veículo',
            $numPatrimonio: 0,
            $setorId: 0
        }                        
    } 
    */
    const { id } = req.params;
    const veiculoExiste: Veiculo | null = await prisma.veiculo.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (!veiculoExiste) {
        return res.status(404).json({ error: "Veículo não encontrado" });
    }
    const { placa, marca, modelo, tipo, status, chassi, renavam, km, ano, cor, combustivel, categoriaCNH, dataLicenciamento, numPatrimonio, setorId } = req.body;
    const veiculoAtualizado: Veiculo = await prisma.veiculo.update({
        include: {
            setor: true,
        },
        where: {
            id: Number(id),
        },
        data: {
            placa: placa,
            marca: marca,
            modelo: modelo,
            tipo: tipo,
            status: status,
            chassi: chassi,
            renavam: renavam,
            km: km,
            ano: ano,
            cor: cor,
            combustivel: combustivel,
            categoriaCNH: categoriaCNH,
            dataLicenciamento: dataLicenciamento,
            numPatrimonio: numPatrimonio,
            setorId: setorId
        }
    });
    return res.json(veiculoAtualizado);
});

veiculoRouter.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Veículos']
    const { id } = req.params;
    const veiculoExiste: Veiculo | null = await prisma.veiculo.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (!veiculoExiste) {
        return res.status(404).json({ error: "Veículo não encontrado" });
    }
    await prisma.veiculo.delete({
        where: {
            id: Number(id),
        },
    });
    return res.sendStatus(204);
});

export default veiculoRouter;
