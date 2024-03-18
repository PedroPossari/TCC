import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';

function DarkModeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? (
        <FaSun style={{ width: 18, height: 18 }} />
      ) : (
        <FaMoon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
}

export default DarkModeButton;
