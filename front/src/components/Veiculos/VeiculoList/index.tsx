import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
} from '@mantine/core';
import { TbSelector, TbChevronDown, TbChevronUp, TbSearch } from 'react-icons/tb'
import styles from "./styles.module.scss";


interface RowData {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  setor: string;
}

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

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const data = [
  {
    id: '1',
    placa: 'ABC-1234',
    marca: 'Chevrolet',
    modelo: 'Onix',
    setor: 'Gabinete'
  },
  {
    id: '2',
    placa: 'DEF-5678',
    marca: 'Fiat',
    modelo: 'Uno',
    setor: 'Meio Ambiente'
  },
  {
    id: '3',
    placa: 'GHI-9101',
    marca: 'Volkswagen',
    modelo: 'Gol',
    setor: 'Saúde'
  }
];

export default function VeiculoList() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.placa}</Table.Td>
      <Table.Td>{row.marca}</Table.Td>
      <Table.Td>{row.modelo}</Table.Td>
      <Table.Td>{row.setor}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<TbSearch style={{ width: rem(16), height: rem(16) }} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('id')}
            >
              Id
            </Th>
            <Th
              sorted={sortBy === 'placa'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('placa')}
            >
              Placa
            </Th>
            <Th
              sorted={sortBy === 'marca'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('marca')}
            >
              Marca
            </Th>
            <Th
              sorted={sortBy === 'modelo'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('modelo')}
            >
              Modelo
            </Th>
            <Th
              sorted={sortBy === 'setor'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('setor')}
            >
              Setor
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
