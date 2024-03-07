import styles from "./Home.module.scss";
function Home() {
    return (
        <div className={styles.veiculos}>
            <h2>Veiculos em Funcionamento</h2>
        <nav className={styles.veiculosNavbar}>
        <ul>
        <li><a href="#">Todos</a></li>
        <li><a href="#">Ativos</a></li>
        <li><a href="#">Estacionados</a></li>
      </ul>
      </nav>
        </div>
    );
}

export default Home;
