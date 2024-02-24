import { FaTruck, FaCar, FaMotorcycle, FaBus, FaCheck, FaWrench } from 'react-icons/fa';
import { CiLocationArrow1 } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getVeiculo } from "../../../services/Veiculos/VeiculosService";
import styles from './styles.module.scss';
import Veiculo from "../../../types/Veiculo";

function VeiculoInfo() {
    const { id } = useParams();
    const { data, isLoading, error } = useQuery<Veiculo>(['getVeiculo', id], () => getVeiculo(id),
    { 
        refetchOnWindowFocus: true,
    });
    if(isLoading) return(<h1>Carregando...</h1>);
    if(error) return(<h1>Erro ao carregar veículo</h1>);
    return (
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.placa}>
                <div className={styles.icon}>
                    {data?.tipo == "Passeio" && <FaCar size={35}/>}
                    {data?.tipo == "Motocicleta" && <FaMotorcycle size={35}/>}
                    {data?.tipo == "Caminhao" && <FaTruck size={35}/>}
                    {data?.tipo == "Onibus" && <FaBus size={35}/>}
                </div>
                <h1>Placa: {data?.placa}</h1>
            </div>
            <div className={styles.statusBar}>
                <div>
                    <h4>Status:</h4>
                    <div className={styles.status}>
                        {data?.status == "Em Uso" && <CiLocationArrow1 size={20}/>}
                        {data?.status == "Disponível" && <FaCheck size={20}/>}
                        {data?.status == "Em Manutenção" && <FaWrench size={20}/>}
                        <p>{data?.status}</p>
                    </div>
                </div>
                <div>
                    <h4>Tipo:</h4>
                    <p>{data?.tipo}</p>
                </div>
            </div>
        </div>
        <div className={styles.card}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis reprehenderit sapiente amet nemo, eius eos veniam necessitatibus nisi quasi cumque, nihil inventore incidunt optio beatae et natus voluptatem sunt ab.
        </div>
    </div>
    );
}

export default VeiculoInfo;