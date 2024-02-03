import "./App.scss";
import { useState } from "react";
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  FaHome,
  FaCar,
  FaUser,
  FaTrafficLight
} from "react-icons/fa";
import DarkModeButton from "./components/DarkModeButton/DarkModeButton";

const data = [
  { link: '', label: 'Home', icon: FaHome },
  { link: '', label: 'Veiculos', icon: FaCar },
  { link: '', label: 'Motoristas', icon: FaUser },
  { link: '', label: 'Portaria', icon: FaTrafficLight },
];

function App() {
  const [opened, { toggle: toggle }] = useDisclosure(true);
  const [active, setActive] = useState('Home');

  const links = data.map((item) => (
    <a
      className="link"
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className="linkIcon"/>
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
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
      <AppShell.Navbar p="md" className="navbar">
        {links}
      </AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}

export default App;