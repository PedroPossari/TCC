import styles from "./Home.module.scss";
import { Tabs } from "@mantine/core";
import { Collapse, Box, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import map from "../../assets/Screenshot_1.png";

function Home() {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div className={styles.homeAll}>
      <div className={styles.itensNav}>
        <div className={styles.subMenu}>
          <Box mx="auto" className={styles.veiculosNavbar}>
            <Burger opened={opened} onClick={toggle}></Burger>
            <Collapse in={opened}>
              <Tabs defaultValue="veiculos" className={styles.veiculos}>
                <h2>Veiculos Ativos</h2>
                <nav>
                  <ul>
                    <Tabs.List>
                      <Tabs.Tab value="ativos">
                        <li> Ativos </li>
                      </Tabs.Tab>
                      <Tabs.Tab value="parados">
                        <li>Parados</li>
                      </Tabs.Tab>
                      <Tabs.Tab value="settings">
                        <li>Quebrados</li>
                      </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

                    <Tabs.Panel value="messages">
                      Messages tab content
                    </Tabs.Panel>

                    <Tabs.Panel value="settings">
                      Settings tab content
                    </Tabs.Panel>
                  </ul>
                </nav>
              </Tabs>
            </Collapse>
          </Box>
        </div>
        <div className={styles.avisos}>
          <h3>Number</h3>
          <p>Veiculos com erro</p>
        </div>
        <div className={styles.avisos}>
          <h3>Number</h3>
          <p>Fora da rota</p>
        </div>
        <div className={styles.avisos}>
          <h3>Number</h3>
          <p>Em atraso</p>
        </div>
        <div>a</div>
      </div>
      <img src={map} alt="" />
    </div>
  );
}
export default Home;
