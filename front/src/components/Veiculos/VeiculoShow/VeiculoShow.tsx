import { useParams } from 'react-router-dom';
import { Tabs } from '@mantine/core';
import { FaInfo, FaWrench } from 'react-icons/fa';

function VeiculoShow() {
    const { id } = useParams();
    return(
        <Tabs defaultValue="informacoes">
            <Tabs.List>
                <Tabs.Tab value="informacoes" leftSection={<FaInfo/>}>Informações</Tabs.Tab>
                <Tabs.Tab value="manutencao" leftSection={<FaWrench/>}>Manutenção</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="informacoes">
                <h1>Informações do veículo {id}</h1>
            </Tabs.Panel>
            <Tabs.Panel value="manutencao">
                <h1>Manutenção do veículo {id}</h1>
            </Tabs.Panel>
        </Tabs>
    );
}

export default VeiculoShow;
