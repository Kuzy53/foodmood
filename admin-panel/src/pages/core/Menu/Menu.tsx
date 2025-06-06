import React, {useEffect} from "react";
import {Badge, Group, Table, Text, Title, useMantineTheme} from '@mantine/core';
import { Button } from '@mantine/core';
import {IconPlus, IconTrashX} from "@tabler/icons-react";
import {TableSort} from "@/components/ui/TableSort/TableSort";
import {Link} from "react-router-dom";
import {modals} from "@mantine/modals";
import useStore from "@/store/main/StoreTemplate";

const headers = [
  {
    name: 'ID restaurant',
    key: 'id',
  },
  {
    name: 'Restaurant name',
    key: 'name',
  },
  {
    name: 'Last edit date',
    key: 'createdAt',
  },
  {
    name: 'Status',
    key: 'status',
  },
  {
    name: 'Actions',
    key: 'actions',
  },
]

const generateRow = (data: any, onDelete: (id: string) => void) => {
  return data.map((row: any) => (
    <Table.Tr key={row?.id || row?.name}>
      <Table.Td><Text size={'12px'}>{row.id}</Text></Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.createdAt}</Table.Td>
      <Table.Td>
        <Badge color={row.isActive ? 'green' : 'pink'} autoContrast >
          {row.isActive ? 'Connected' : 'Not connected'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Link to={`/menu/${row.id}`}>
          <Button variant={'transparent'} color={'gray'} size={'sm'} px={'sm'}>Edit</Button>
        </Link>
        <Button variant={'transparent'} color={'gray'} size={'sm'} px={'sm'} onClick={() => onDelete(row.id)}>
          <IconTrashX/>
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
}

export default function Menu() {
  const { fetchData, loading, dataList: menuList, removeItem } = useStore()

  useEffect(() => {
    fetchData('menus')
  }, []);

  const onDelete = (id: string) => modals.openConfirmModal({
    title: 'Please confirm your action',
    centered: true,
    labels: {confirm: 'Confirm', cancel: 'Cancel'},
    onConfirm: () => handleDelete(id),
  });

  const handleDelete = async (id: string) => {
    await removeItem('menus/' + id)
    await fetchData('menus')
  }

  return (
    <>
      <Group justify={'space-between'}>
        <Title>Menu</Title>
        <Link to={'/menu/create'}>
          <Button variant="filled" color={'primary'} size="lg" radius={'lg'}>
            Create menu
            <IconPlus style={{marginLeft: '7px'}} />
          </Button>
        </Link>
      </Group>

      <TableSort
        loading={loading}
        data={menuList}
        headers={headers}
        rows={(data) => generateRow(data, onDelete)}
        notFoundMessage={"You haven't created any menu yet"}/>
    </>
  )
}
