import { useState } from 'react';
import {
  Table,
  ScrollArea,
  Text,
  TextInput,
  rem,
  keys,
} from '@mantine/core';
import Th from '../../TableHead';
import { TbSearch } from 'react-icons/tb'
import Setor from '../../../types/Setor';
import { useQuery } from 'react-query';
import { listVeiculos } from '../../../services/Veiculos/VeiculosService';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import styles from './styles.module.scss';

const rowSchema = z.array(
  z.object({
    id: z.number(),
    placa: z.string(),
    marca: z.string(),
    modelo: z.string(),
    setor: z.object({
      id: z.number(),
      nome: z.string(),
    }),
  })
);

interface RowData {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  setor: Setor;
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => key == "setor" ? item[key].nome.toLowerCase().includes(query) : key == "id" ? item[key].toString().toLowerCase().includes(query) : item[key].toLowerCase().includes(query))
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
        if(sortBy == "setor")
          return b[sortBy].nome.localeCompare(a[sortBy].nome);
        else if(sortBy == "id")
          return b[sortBy].toString().localeCompare(a[sortBy].toString());
          return b[sortBy].localeCompare(a[sortBy]);
      }
      if(sortBy == "setor")
        return a[sortBy].nome.localeCompare(b[sortBy].nome);
      else if(sortBy == "id")
        return a[sortBy].toString().localeCompare(b[sortBy].toString());
        return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

function VeiculoList() {
  const { data, isLoading, error } = useQuery<RowData[]>('listVeiculos', listVeiculos);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  let veiculos = sortData(rowSchema.parse(data ?? []), { sortBy, reversed: reverseSortDirection, search });

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    veiculos = sortData(veiculos, { sortBy: field, reversed, search });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    veiculos = sortData(veiculos, { sortBy, reversed: reverseSortDirection, search: value });
  };

  const navigate = useNavigate();

  const rows = veiculos.map((row: RowData) => (
    <Table.Tr key={row.id} onClick={() => navigate(`/veiculos/${row.id}`)} className={styles.tr}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.placa}</Table.Td>
      <Table.Td>{row.marca}</Table.Td>
      <Table.Td>{row.modelo}</Table.Td>
      <Table.Td>{row.setor.nome}</Table.Td>
    </Table.Tr>
  ));

  if (isLoading) return <h1>Carregando...</h1>
  if (error) return <h1>Erro ao carregar</h1>
  return (
    <ScrollArea>
      <TextInput
        placeholder="Buscar por campo"
        mb="md"
        leftSection={<TbSearch style={{ width: rem(16), height: rem(16) }} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
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
              <Table.Td colSpan={5}>
                <Text fw={500} ta="center" >
                  Nenhum veículo encontrado
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default VeiculoList;