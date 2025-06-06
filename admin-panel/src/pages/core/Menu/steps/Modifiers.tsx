import React, {useEffect, useState} from 'react';
import MenuLayout from "@/pages/core/Menu/MenuLayout";
import {TableSort} from "@/components/ui/TableSort/TableSort";
import {
  Badge, Box,
  Button,
  FileInput,
  Flex,
  InputDescription,
  Switch,
  Image,
  Table,
  TextInput,
  Title,
  useMantineTheme
} from "@mantine/core";
import {Link, useParams} from "react-router-dom";
import useStore from "@/store/main/StoreTemplate";
import {modals} from "@mantine/modals";
import {isNotEmpty, useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";
import {uploadFile} from "@/fetchs/files";
import SelectNutritional from "@/components/ui/SelectNutritional";
import {Dish} from "@/@types/Modules";
import FileUpload from "@/components/ui/FileUpload/FileUpload";

const headers = [

  {
    name: 'Id',
    key: 'id',
  },
  {
    name: 'Name',
    key: 'name',
  },

  {
    name: 'Price',
    key: 'price',
  },

]

const generateRow = (data: any, onDelete: (id: string) => void, setActive: (data: any) => void, activeEl: any) => {
  return data.map((row: any) => (
    <Table.Tr  key={row?.id || row?.name} onClick={() => setActive(row)} style={{background: activeEl?.id === row.id ? '#f3f4f5' : '', cursor: 'pointer'}}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>${row.price}</Table.Td>
    </Table.Tr>
  ));
}

function Modifiers() {
  const {fetchData, loading,dataList, createItem, removeItem, updateItem} = useStore()
  const [activeEl, setActiveEl] = useState<Dish | null>()
  const theme = useMantineTheme();
  const { id: menuId } = useParams();

  useEffect(() => {
    fetchData('modifications')
  }, []);

  const onDelete = (id: string) => modals.openConfirmModal({
    title: 'Are you sure you want to delete the category?',
    centered: true,
    labels: {confirm: 'Yes, I want', cancel: 'No'},
    onConfirm: () => handleDelete(id),
  });

  const handleDelete = async (id: string) => {
    await removeItem('modifications/' + id)
    await fetchData('modifications')
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
      form.setValues({
        ...row,
        price: '' + row.price,
        weight: '' + row.weight,
        nutritionalId: '' + row.nutritionalId,
      })
      setShowChildren(true)
    }
  }

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      photo: null,
      nutritionalId: '',
      isAvailable: false,
      weight: ''
    },

    validate: {
      name: isNotEmpty('Name is required'),
      description: isNotEmpty('Description is required'),
      price: isNotEmpty('Price is required'),
      weight: isNotEmpty('Weight is required'),
      photo: isNotEmpty('Photo is required'),
      nutritionalId: isNotEmpty('NutritionalId is required'),
    },
  });

  const handleCreate = async (values: any) => {
    let res;

    if(activeEl){
      let photo = values.photo;

      if(typeof values.photo === 'object'){
        photo = await uploadFile(values.photo)
      }

      res = await updateItem('modifications/' + activeEl.id, {
        dish: {
          ...values,
          price: +values.price,
          weight: +values.weight,
          nutritionalId: +values.nutritionalId,
          is_available: values.isAvailable,
          photo: photo
        }
      })
    }else{
      const photo = await uploadFile(values.photo)

      if(photo?.status !== 200){
        return
      }

      res = await createItem('modifications/modfication', {
        dish: {
          ...values,
          price: +values.price,
          weight: +values.weight,
          nutritionalId: +values.nutritionalId,
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0niKX9VB9hv2qazsntm1aaxcQx2gup2pDQ&s'
        }
      })
    }

    if(res?.status === 200){
      const message = activeEl ? 'Successfully updated' : 'Successfully created'
      notifications.show({message})
      await fetchData('modifications')
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
        filter={{
          filterByStatus: false
        }}
        showChildren={showChildren}
        setShowChildren={(val) => setShowChildren(val)}
        rows={(data) => generateRow(data, onDelete, setActive, activeEl)}
        actionBtn={{
          close: 'Close form create',
          open: 'Create a modifier set'
        }}
        notFoundMessage={"You haven't created any menu yet"}
      >
        <form onSubmit={form.onSubmit((values) => handleCreate(values))}>
          <Flex direction={'column'} gap={'12px'}>
            <Title order={2}>{activeEl ? 'Update' : 'Create'} a dish <span style={{color: theme.colors.primary[0]}}>{activeEl ? activeEl.name : null}</span></Title>

            <FileUpload
              oldImage={activeEl?.photo}
              formParams={form.getInputProps('photo')}
              description={'Choose a high-quality photo, 3х4'}
            />
            <TextInput
              withAsterisk
              label="Name"
              size={'sm'}
              placeholder="Name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Description"
              size={'sm'}
              placeholder="Description"
              key={form.key('description')}
              {...form.getInputProps('description')}
            />
            <TextInput
              label="Price"
              size={'sm'}
              placeholder="Price"
              prefix={'$'}
              key={form.key('price')}
              {...form.getInputProps('price')}
            />

            <SelectNutritional
              formParams={form.getInputProps('nutritionalId')}
            />

            <TextInput
              withAsterisk
              label="Grams"
              size={'sm'}
              placeholder="How many grams"
              key={form.key('weight')}
              {...form.getInputProps('weight')}
            />
            <Switch
              mt={'lg'}
              label="Show this category in menu"
              key={form.key('isAvailable')}
              {...form.getInputProps('isAvailable', { type: 'checkbox' })}
            />
            <Flex  mt={'md'} gap={'sm'}>
              <Button type="submit"  loading={loading}>{activeEl ? 'Update': 'Create'}</Button>
              {activeEl &&
                <Button variant={'outline'}  loading={loading} onClick={() => handleDelete(activeEl.id)}>Remove</Button>
              }
            </Flex>
          </Flex>

        </form>
      </TableSort>
    </MenuLayout>
  );
}

export default Modifiers;