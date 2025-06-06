import {Badge, Box, Button, Flex, Switch, Table, Text, TextInput, Title, useMantineTheme} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconRosetteDiscountCheck, IconTrashX} from "@tabler/icons-react";
import React, {useEffect, useState} from "react";
import useStore from "@/store/main/StoreTemplate";
import {TableSort} from "@/components/ui/TableSort/TableSort";
import {isNotEmpty, useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {modals} from "@mantine/modals";

const headers = [
  {
    name: 'Name',
    key: 'name',
  },
  {
    name: 'Second_name',
    key: 'second_name',
  },
  {
    name: 'Phone',
    key: 'phone',
  },
  {
    name: 'Email',
    key: 'email',
  },
  {
    name: 'Role',
    key: 'role',
  },
]
const generateRow = (data: any, setActive: (data: any) => void, activeEl: any) => {
  const theme = useMantineTheme();

  return data.map((row: any) => (
      <Table.Tr key={row?.id || row?.name} onClick={() => setActive(row)} style={{background: activeEl?.id === row.id ? '#f3f4f5' : '', cursor: 'pointer'}}>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{row.phone}</Table.Td>
        <Table.Td>
          <Flex align={'center'} gap={'4px'}  style={{whiteSpace: 'wrap'}}>
            {row.is_verified && (
                <IconRosetteDiscountCheck width={20} style={{flexShrink: 0, color: theme.colors.primary[0]}} />
            )}
            <Box >
              <span  style={{whiteSpace: 'wrap', textWrap: 'wrap', wordBreak: 'break-all', fontSize: '13px'}}>
                {row.email}
              </span>
            </Box>
          </Flex>
        </Table.Td>
        <Table.Td>{row.role}</Table.Td>
        {/*<Table.Td>*/}
        {/*  <Badge color={row.isActive ? 'green' : 'pink'} autoContrast >*/}
        {/*    {row.isActive ? 'Connected' : 'Not connected'}*/}
        {/*  </Badge>*/}
        {/*</Table.Td>*/}
      </Table.Tr>
  ));
}
export default function Users(){
  const { fetchData, loading, dataList: menuList, removeItem, updateItem, createItem} = useStore()
  const [showChildren, setShowChildren] = useState(false)
  const [activeEl, setActiveEl] = useState<any | null>()

  useEffect(() => {
    fetchData('admin/users/')
  }, []);

  const form = useForm({
    initialValues: {
      name: '',
      second_name: '',
      surname: '',
      phone: '',
    },

    validate: {
      name: isNotEmpty('Name is required'),
      second_name: isNotEmpty('Second Name is required'),
      surname: isNotEmpty('Surname is required'),
      phone: isNotEmpty('Phone is required'),
    },
  });

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

  const handleCreate = async (values: any) => {
    let res;
    if(!activeEl){
      return
    }

    res = await updateItem('admin/users/' + activeEl.id, {
      user: values
    })

    if(res?.status === 200){
      notifications.show({message: 'Successfully created'})
      await fetchData('admin/users/')
      form.reset()
      setActiveEl(null)
    }
  }
  const theme = useMantineTheme();

  const onDelete = (id: string) => modals.openConfirmModal({
    title: 'Are you sure you want to delete?',
    centered: true,
    labels: {confirm: 'Yes, I want', cancel: 'No'},
    onConfirm: () => handleDelete(id),
  });

  const handleDelete = async (id: string) => {
    await removeItem('admin/users/' + id)
    await fetchData('admin/users/',)
    setActiveEl(null)
    form.reset()
  }

  return(
    <>
      <TableSort
          loading={loading}
          data={menuList}
          headers={headers}
          showChildren={showChildren}
          setShowChildren={(val) => setShowChildren(val)}
          rows={(data) => generateRow(data, setActive, activeEl)}
          notFoundMessage={"Users not found"}
      >
        <form onSubmit={form.onSubmit((values) => handleCreate(values))}>
          <Flex direction={'column'} gap={'10px'}>
            <Title order={2} mb={'md'}>{activeEl ? 'Update' : 'Create'} a category <span
                style={{color: theme.colors.primary[0], wordBreak: 'break-all'}}>{activeEl ? activeEl.email : null}</span></Title>
            <TextInput
                withAsterisk
                label="Name"
                placeholder="Name"
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <TextInput
                withAsterisk
                label="Surname"
                placeholder="Surname"
                key={form.key('surname')}
                {...form.getInputProps('surname')}
            />
            <TextInput
                withAsterisk
                label="Second Name"
                placeholder="Second Name"
                key={form.key('second_name')}
                {...form.getInputProps('second_name')}
            />
            <TextInput
                withAsterisk
                label="Phone"
                placeholder="Phone"
                key={form.key('phone')}
                {...form.getInputProps('phone')}
            />

            <Flex mt={'md'} gap={'sm'}>
              <Button type="submit" loading={loading}>{activeEl ? 'Update' : 'Create'}</Button>
              {activeEl &&
                  <Button variant={'outline'} loading={loading} onClick={() => onDelete(activeEl.id)}>Remove</Button>
              }
            </Flex>
          </Flex>
        </form>
      </TableSort>
    </>
  )
}
