import React, {useEffect} from "react";
import {Badge, Group, Table, Text, Title} from '@mantine/core';
import {Button} from '@mantine/core';
import {IconPlus, IconTrashX} from "@tabler/icons-react";
import {TableSort} from "@/components/ui/TableSort/TableSort";
import {Link} from "react-router-dom";
import {modals} from "@mantine/modals";
import useRestStore from "@/pages/core/Restaurant/store/restaurantStore";
import useStore from "@/store/main/StoreTemplate";

const data = [
  {
    id: '1',
    name: 'Sample Item 1',
    createdAt: '2024-09-01T12:34:56Z',
    time: '30m',
    status: 'Menu connected'
  },
  {
    id: '2',
    name: 'Sample Item 2',
    createdAt: '2024-09-02T08:21:30Z',
    time: '1h',
    status: 'Menu not connected'
  },
  {
    id: '3',
    name: 'Sample Item 3',
    createdAt: '2024-09-03T15:45:00Z',
    time: '2h',
    status: 'Menu connected'
  },
  {
    id: '4',
    name: 'Sample Item 4',
    createdAt: '2024-09-04T11:12:10Z',
    time: '45m',
    status: 'Menu not connected'
  },
  {
    id: '5',
    name: 'Sample Item 5',
    createdAt: '2024-09-05T09:23:45Z',
    time: '1h 30m',
    status: 'Menu connected'
  },
  {
    id: '6',
    name: 'Sample Item 6',
    createdAt: '2024-09-06T14:34:56Z',
    time: '3h',
    status: 'Menu not connected'
  },
  {
    id: '7',
    name: 'Sample Item 7',
    createdAt: '2024-09-07T07:56:22Z',
    time: '2h 15m',
    status: 'Menu connected'
  },
  {
    id: '8',
    name: 'Sample Item 8',
    createdAt: '2024-09-08T13:45:12Z',
    time: '1h 45m',
    status: 'Menu not connected'
  },
  {
    id: '9',
    name: 'Sample Item 9',
    createdAt: '2024-09-09T10:21:30Z',
    time: '30m',
    status: 'Menu connected'
  },
  {
    id: '10',
    name: 'Sample Item 10',
    createdAt: '2024-09-10T16:34:45Z',
    time: '2h 30m',
    status: 'Menu not connected'
  }
];

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
    name: 'Menu id',
    key: 'menuId',
  },
  {
    name: 'City',
    key: 'city',
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
      <Table.Td>{row.menuId}</Table.Td>
      <Table.Td>{row.city}</Table.Td>
      <Table.Td>
        <Badge color={row.isActive ? 'green' : 'pink'} autoContrast>
          {row.isActive ? 'Connected' : 'Not connected'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Link to={`/restaurant/edit/${row.id}`}>
          <Button variant={'transparent'} color={'gray'} size={'sm'} px={'sm'}>Edit</Button>
        </Link>
        <Button variant={'transparent'} color={'gray'} size={'sm'} px={'sm'} onClick={() => onDelete(row.id)}>
          <IconTrashX/>
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
}

export default function Restaurant() {
  const {fetchData, dataList: restaurants, removeItem, loading} = useStore()

  const handleDelete = async (id: string) => {
    await removeItem('restaurants/' + id)
    await fetchData('restaurants')
  }

  useEffect(() => {
    fetchData('restaurants')
  }, []);

  const onDelete = (id: string) => modals.openConfirmModal({
    title: 'Please confirm your action',
    centered: true,
    labels: {confirm: 'Confirm', cancel: 'Cancel'},
    onConfirm: () => handleDelete(id),
  });

  return (
    <>
      <Group justify={'space-between'}>
        <Title>Restaurants</Title>
        <Link to={'/restaurant/create'}>
          <Button variant="filled" color={'primary'} size="lg" radius={'lg'}>
            Create restaurant
            <IconPlus style={{marginLeft: '7px'}}/>
          </Button>
        </Link>
      </Group>
      {
        Array.isArray(restaurants) && restaurants.length > 0 &&
          <TableSort
            data={restaurants}
            headers={headers}
            loading={loading}
            rows={(data) => generateRow(data, onDelete)}
        />
      }
    </>
  )
}
