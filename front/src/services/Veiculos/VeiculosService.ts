import axios from 'axios';
import Veiculo from '../../types/Veiculo';

async function getVeiculo(id: string | undefined) {
    const { data } = await axios.get(`http://localhost:3000/veiculos/${id}`);
    return data;
}

async function listVeiculos() {
    const { data } = await axios.get('http://localhost:3000/veiculos');
    return data;
}

async function createVeiculo(veiculo: Veiculo) {
    const { data } = await axios.post('http://localhost:3000/veiculos', veiculo);
    return data;
}

async function updateVeiculo(veiculo: Veiculo) {
    const { data } = await axios.put(`http://localhost:3000/veiculos/${veiculo.id}`, veiculo);
    return data;
}

async function deleteVeiculo(id: string) {
    await axios.delete(`http://localhost:3000/veiculos/${id}`);
}

export { getVeiculo, listVeiculos, createVeiculo, updateVeiculo, deleteVeiculo};
