import React, {useEffect, useState} from 'react';
import MenuLayout from "@/pages/core/Menu/MenuLayout";
import useStore from "@/store/main/StoreTemplate";
import {isNotEmpty, useForm} from "@mantine/form";
import {Badge, Box, Button, Flex, Switch, Table, Text, TextInput, Title, useMantineTheme} from "@mantine/core";
import {notifications} from "@mantine/notifications";
import {TableSort} from "@/components/ui/TableSort/TableSort";
import {modals} from "@mantine/modals";
import ApiService from "@/services/ApiService";
import {Link, useParams} from "react-router-dom";

const headers = [
  {
    name: 'Name',
    key: 'name',
  },
  {
    name: 'Status',
    key: 'status',
  },
]


const generateRow = (data: any, onDelete: (id: string) => void, setActive: (data: any) => void, activeEl: any) => {
  return data.map((row: any) => (
    <Table.Tr  key={row?.id || row?.name} onClick={() => setActive(row)} style={{background: activeEl?.id === row.id ? '#f3f4f5' : '', cursor: 'pointer'}}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        <Badge color={row.isActive ? 'green' : 'pink'} autoContrast >
          {row.isActive ? 'Is displayed' : 'Not displayed'}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));
}

function Categories() {
  const {fetchData, loading,dataList, createItem, removeItem, updateItem} = useStore()
  const [activeEl, setActiveEl] = useState<{id: string, name: string} | null>()
  const theme = useMantineTheme();
  const { id: menuId } = useParams();

  useEffect(() => {
    fetchData('categories')
  }, []);

  const onDelete = (id: string) => modals.openConfirmModal({
    title: 'Are you sure you want to delete the category?',
    centered: true,
    labels: {confirm: 'Yes, I want', cancel: 'No'},
    onConfirm: () => handleDelete(id),
  });

  const handleDelete = async (id: string) => {
    await removeItem('categories/' + id)
    await fetchData('categories',)
    setActiveEl(null)
    form.reset()
  }

  const setActive = async (row: any) => {
    if(activeEl && activeEl?.id === row.id){
      setActiveEl(null)
      form.reset()
      setShowChildren(false)
    }else{
      setActiveEl(row)
      console.log('row', row)
      form.setValues(row)
      setShowChildren(true)
    }
  }

  const form = useForm({
    initialValues: {
      name: '',
      isActive: false,
    },

    validate: {
      name: isNotEmpty('Name is required'),
    },
  });

  const handleCreate = async (values: any) => {
    let res;
    if(activeEl){
      res = await updateItem('categories/' + activeEl.id, {
        name: values.name,
        is_active: values.isActive
      })
    }else{
      res = await createItem('categories/category', {
        category: values
      })
    }

    if(res?.status === 200){
      notifications.show({message: 'Successfully created'})
      await fetchData('categories',)
      form.reset()
      setActiveEl(null)
    }
  }

  const [showChildren, setShowChildren] = useState(false)

  return (
    <MenuLayout>
      <TableSort
        loading={loading}
        data={dataList}
        headers={headers}
        showChildren={showChildren}
        setShowChildren={(val) => setShowChildren(val)}
        rows={(data) => generateRow(data, onDelete, setActive, activeEl)}
        actionBtn={{
          close: 'Close form create',
          open: 'Create a category'
        }}
        notFoundMessage={"You haven't created any menu yet"}
      >
        <form onSubmit={form.onSubmit((values) => handleCreate(values))}>
          <Title order={2} mb={'md'}>{activeEl ? 'Update' : 'Create'} a category <span style={{color: theme.colors.primary[0]}}>{activeEl ? activeEl.name : null}</span></Title>
          <TextInput
            withAsterisk
            label="Category name"
            placeholder="Placeholder"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Switch
            mt={'lg'}
            label="Show this category in menu"
            key={form.key('isActive')}
            {...form.getInputProps('isActive', { type: 'checkbox' })}
          />
          <Flex  mt={'md'} gap={'sm'}>
            <Button type="submit"  loading={loading}>{activeEl ? 'Update': 'Create'}</Button>
            {activeEl &&
              <Button variant={'outline'}  loading={loading} onClick={() => handleDelete(activeEl.id)}>Remove</Button>
            }
          </Flex>
        </form>
      </TableSort>
    </MenuLayout>
  );
}

export default Categories;