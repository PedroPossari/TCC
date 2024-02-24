import Setor from './Setor';

type Veiculo = {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    tipo: string;
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
    setor: Setor;
};

export default Veiculo;