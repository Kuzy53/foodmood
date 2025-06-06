import React, {useEffect, useState} from 'react';
import {isNotEmpty, useForm} from "@mantine/form";
import {
  Button,
  Container, Flex,
  InputDescription,
  MultiSelect,
  Switch,
  TextInput,
  Title,
  useMantineTheme
} from "@mantine/core";
import useMenuStore from "@/pages/core/Menu/store/menuStore";
import useMenuStepsStore from "@/pages/core/Menu/store/menuStepsStore";
import {notifications} from "@mantine/notifications";
import useStore from "@/store/main/StoreTemplate";
import MenuLayout from "@/pages/core/Menu/MenuLayout";
import {Link, useNavigate, useParams} from "react-router-dom";
import ApiService from "@/services/ApiService";

function AboutMenu() {
  const {createItem, loading, fetchOne, updateItem} = useStore()
  const navigate = useNavigate()
  const {id} = useParams()
  const [name, setName] = useState(null)
  const theme = useMantineTheme();


  useEffect(() => {
    initFetch()
  }, [id]);

  const initFetch = async () => {
    if (id) {
      const res = await fetchOne('menus/' + id)
      if (res.status === 200) {
        form.setValues(res.data.payload.menu)
        setName(res.data.payload.menu.name)
      }
    }
  }


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      isActive: false,
    },

    validate: {
      name: isNotEmpty('Name is required'),
      description: isNotEmpty('Description is required'),
    },
  });

  const handleSubmit = async (values: any) => {
    if (id) {
      const res = await updateItem('menus/' + id, {
        values
      })
      if (res.status === 200) {
        notifications.show({message: 'Successfully updated'})
        navigate(`/menu/${res.data.payload.id}/categories`);
      }
    } else {
      const res = await createItem('menus/menu', {
        menu: {
          values
        }
      })
      if (res?.status === 200) {
        notifications.show({message: 'Successfully created'})
        navigate(`/menu/${res.data.payload.id}/categories`);
      }
    }

  }

  return (
    <MenuLayout>
      <Container size={'sm'} mt={'xl'}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Title mb={'md'}>About the menu
            <span style={{color: theme.colors.primary[0]}}>{!!name ? ` - ${name}` : ''}</span>
          </Title>
          <TextInput
            withAsterisk
            disabled={loading}
            label="Name of the menu"
            placeholder="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <InputDescription mt={'xs'} mb={'md'}>Please provide the name of the menu</InputDescription>

          <TextInput
            withAsterisk
            disabled={loading}
            label="Description"
            placeholder="Description"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />

          <Switch
            {...form.getInputProps('isActive')}
            label="Is active"
            disabled={loading}
            my={'lg'}
          />

          <Button type="submit" loading={loading}>{!!id ? 'Update' : "Create"}</Button>
        </form>
      </Container>
    </MenuLayout>
  );
}

export default AboutMenu;