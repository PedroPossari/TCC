import { FaTruck, FaCar, FaMotorcycle, FaBus, FaCheck, FaWrench } from 'react-icons/fa';
import { CiLocationArrow1 } from "react-icons/ci";
import { useParams } from 'react-router-dom';
//import { useQuery } from 'react-query';
//import { getVeiculo } from "../../../services/Veiculos/VeiculosService";
import './VeiculoInfo.scss';
function VeiculoInfo() {
    const { id } = useParams();
    const tipo = "carro";
    const status = "Em Uso";
    /*
    const { data, isLoading, error } = useQuery(['veiculo', id], () => getVeiculo(id),
    { 
        refetchOnWindowFocus: true,
    });
    if(isLoading) return(<h1>Carregando...</h1>);
    if(error) return(<h1>Erro ao carregar veículo</h1>);
    */
    return (
    <div className="container">
        <div className="card">
            <div className="placa">
                <div className="icon">
                    {tipo == "carro" && <FaCar size={35}/>}
                    {tipo == "moto" && <FaMotorcycle size={35}/>}
                    {tipo == "caminhao" && <FaTruck size={35}/>}
                    {tipo == "onibus" && <FaBus size={35}/>}
                </div>
                <h1>Placa: {id}</h1>
            </div>
            <div className="statusBar">
                <div>
                    <h4>Status:</h4>
                    <div className="status">
                        {status == "Em Uso" && <CiLocationArrow1 size={20}/>}
                        {status == "Disponível" && <FaCheck size={20}/>}
                        {status == "Em Manutenção" && <FaWrench size={20}/>}
                        <p>Em Uso</p>
                    </div>
                </div>
                <div>
                    <h4>Tipo:</h4>
                    <p>Carro</p>
                </div>
            </div>
        </div>
        <div className="card">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis reprehenderit sapiente amet nemo, eius eos veniam necessitatibus nisi quasi cumque, nihil inventore incidunt optio beatae et natus voluptatem sunt ab.
        </div>
    </div>
    );
}

export default VeiculoInfo;