import { UnstyledButton, Group, Center, Text, Table, rem } from '@mantine/core';
import { TbChevronDown, TbChevronUp, TbSelector } from 'react-icons/tb';
import styles from './styles.module.scss';

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
  }

function Th({ children, reversed, sorted, onSort }: ThProps) {
const Icon = sorted ? (reversed ? TbChevronUp : TbChevronDown) : TbSelector;
return (
<Table.Th className={styles.th}>
    <UnstyledButton onClick={onSort} className={styles.control}>
      <Group justify="space-between">
        <Text fw={500} fz="sm">
          {children}
        </Text>
        <Center className={styles.icon}>
          <Icon style={{ width: rem(16), height: rem(16) }} />
        </Center>
      </Group>
    </UnstyledButton>
</Table.Th>
);
}

export default Th;

