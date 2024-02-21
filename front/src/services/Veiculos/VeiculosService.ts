import axios from 'axios';

async function getVeiculo(id: string | undefined) {
    const { data } = await axios.get(`http://localhost:3000/veiculos/${id}`);
    return data;
}

export { getVeiculo };
