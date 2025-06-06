import React, {useEffect, useState} from 'react';
import useStore from "@/store/main/StoreTemplate";
import {isNotEmpty, useForm} from "@mantine/form";
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  NumberInput, Select,
  Switch,
  Table,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from "@mantine/core";
import {notifications} from "@mantine/notifications";
import {TableSort} from "@/components/ui/TableSort/TableSort";
import {modals} from "@mantine/modals";
import ApiService from "@/services/ApiService";
import {useParams} from "react-router-dom";

const headers = [
  {
    name: 'Name',
    key: 'name',
  },
  {
    name: 'Price',
    key: 'price',
  },
  {
    name: 'Discount',
    key: 'discount',
  },
  {
    name: 'Status',
    key: 'status',
  },
]


const generateRow = (data: any, onDelete: (id: string) => void, setActive: (data: any) => void, activeEl: any) => {
  return data.map((row: any) => (
    <Table.Tr key={row?.id || row?.name} onClick={() => setActive(row)}
              style={{background: activeEl?.id === row.id ? '#f3f4f5' : '', cursor: 'pointer'}}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.price}$</Table.Td>
      <Table.Td>{row.discount}%</Table.Td>
      <Table.Td>
        <Badge color={row.is_available ? 'green' : 'pink'} autoContrast>
          {row.is_available ? 'Is Available' : 'Not Available'}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));
}

function TariffsEdit() {
  const {fetchData, loading, dataList, createItem, removeItem, updateItem} = useStore()
  const [activeEl, setActiveEl] = useState<{ id: string, name: string } | null>()
  const theme = useMantineTheme();
  const {id: menuId} = useParams();

  useEffect(() => {
    fetchData('tariff/')
  }, []);

  const onDelete = (id: string) => modals.openConfirmModal({
    title: 'Are you sure you want to delete the category?',
    centered: true,
    labels: {confirm: 'Yes, I want', cancel: 'No'},
    onConfirm: () => handleDelete(id),
  });

  const handleDelete = async (id: string) => {
    await removeItem('tariff/' + id)
    await fetchData('tariff/')
    setActiveEl(null)
    form.reset()
  }

  const setActive = async (row: any) => {
    if (activeEl && activeEl?.id === row.id) {
      setActiveEl(null)
      form.reset()
      setShowChildren(false)
    } else {
      setActiveEl(row)
      form.setValues(row)
      setShowChildren(true)
    }
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      price: 0,
      description: '',
      period: '',
      conditions: {
        max_number_of_restaurants: 0,
        max_number_of_categories: 0,
        max_number_of_dishes: 0
      },
      privileges: '',
      has_trial: false
    },

    validate: {
      name: isNotEmpty('Name is required'),
      price: isNotEmpty('Price is required'),
      description: isNotEmpty('Description is required'),
      period: isNotEmpty('Period is required'),
    },
  });

  const handleCreate = async (values: any) => {
    let res;
    if (activeEl) {
      res = await updateItem('tariff/' + activeEl.id, {
        name: values.name
      })
    } else {
      res = await createItem('tariff/', {
        tariff: values
      })
    }

    if (res?.status === 200) {
      notifications.show({message: 'Successfully created'})
      await fetchData('tariff/')
      form.reset()
      setActiveEl(null)
    }
  }

  const [showChildren, setShowChildren] = useState(false)

  return (
    <TableSort
      loading={loading}
      data={dataList}
      headers={headers}
      showChildren={showChildren}
      setShowChildren={(val) => setShowChildren(val)}
      rows={(data) => generateRow(data, onDelete, setActive, activeEl)}
      actionBtn={{
        close: 'Close form create',
        open: 'Create a tariff'
      }}
      notFoundMessage={"You haven't created any menu yet"}
    >
      <form onSubmit={form.onSubmit((values) => handleCreate(values))}>
       <Flex direction={'column'} gap={'12px'}>
         <Title order={2}>{activeEl ? 'Update' : 'Create'} a tariff<span
           style={{color: theme.colors.primary[0]}}>{activeEl ? ' - ' + activeEl.name : null}</span></Title>
         <TextInput
           withAsterisk
           label="Name"
           placeholder="Name"
           size={'sm'}
           key={form.key('name')}
           {...form.getInputProps('name')}
         />
         <NumberInput
           withAsterisk
           label="Price"
           placeholder="Price"
           leftSection={'$'}
           size={'sm'}
           key={form.key('price')}
           {...form.getInputProps('price')}
         />
         <NumberInput
           withAsterisk
           label="Discount"
           placeholder="Discount"
           leftSection={'%'}
           size={'sm'}
           key={form.key('discount')}
           {...form.getInputProps('discount')}
         />
         <Select
           label={"Period"}
           placeholder={"Period"}
           size={'sm'}
           data={[{value: 'month', label: "Month"}, {value: 'year', label: 'Year'}]}
           key={form.key('period')}
           {...form.getInputProps('period')}
         />
         <Group mt="md" grow>
           <NumberInput
             label="Max number of restaurants"
             key={form.key('conditions.max_number_of_restaurants')}
             {...form.getInputProps('conditions.max_number_of_restaurants')}
           />
           <NumberInput
             key={form.key('conditions.max_number_of_categories')}
             label="Max number of categories"
             {...form.getInputProps('conditions.max_number_of_categories')}
           />
           <NumberInput
             key={form.key('conditions.max_number_of_dishes')}
             label="Max number of dishes"
             {...form.getInputProps('conditions.max_number_of_dishes')}
           />
         </Group>

         <Title order={3} mt={'15px'}>Advantage</Title>
         <TextInput
           withAsterisk
           label="Description"
           placeholder="For example: Experience the full potential"
           size={'sm'}
           key={form.key('description')}
           {...form.getInputProps('description')}
         />
         <Switch
           label={'Has trial'}
           {...form.getInputProps('has_trial')}
         ></Switch>
         <Flex mt={'md'} gap={'sm'}>
           <Button type="submit" loading={loading}>{activeEl ? 'Update' : 'Create'}</Button>
           {activeEl &&
             <Button variant={'outline'} loading={loading} onClick={() => handleDelete(activeEl.id)}>Remove</Button>
           }
         </Flex>
       </Flex>
      </form>
    </TableSort>
  );
}

export default TariffsEdit;