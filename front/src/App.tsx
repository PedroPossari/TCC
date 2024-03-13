import styles from "./App.module.scss";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaHome, FaCar, FaUser, FaTrafficLight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DarkModeButton from "./components/DarkModeButton";
import Router from "./Router";

const data = [
  { link: "/", label: "Home", icon: FaHome },
  { link: "/veiculos", label: "Veiculos", icon: FaCar },
  { link: "/motoristas", label: "Motoristas", icon: FaUser },
  { link: "/portaria", label: "Portaria", icon: FaTrafficLight },
];

function App() {
  const [opened, { toggle: toggle }] = useDisclosure(true);

  const links = data.map((item) => (
    <NavLink
      className={({ isActive }) => (isActive ? styles.active : styles.link)}
      to={item.link}
      key={item.label}
    >
      <item.icon className={styles.linkIcon} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <h1>Logo</h1>
          <DarkModeButton />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className={styles.navbar}>
        {links}
      </AppShell.Navbar>
      <AppShell.Main>
        <Router />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
