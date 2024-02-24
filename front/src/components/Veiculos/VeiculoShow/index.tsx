import { Tabs } from '@mantine/core';
import { FaInfo, FaWrench } from 'react-icons/fa';
import VeiculoInfo from "../VeiculoInfo";

function VeiculoShow() {
    return(
        <Tabs defaultValue="informacoes">
            <Tabs.List> 
                <Tabs.Tab value="informacoes" leftSection={<FaInfo/>}>Informações</Tabs.Tab>
                <Tabs.Tab value="manutencao" leftSection={<FaWrench/>}>Manutenção</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="informacoes">
                <VeiculoInfo/>
            </Tabs.Panel>
            <Tabs.Panel value="manutencao">
                <h1>Manutenção do veículo</h1>
            </Tabs.Panel>
        </Tabs>
    );
}

export default VeiculoShow;
