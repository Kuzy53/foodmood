import React, {useEffect} from 'react';
import {Container, Flex, InputDescription, Title, Button, NumberInput, Select, TextInput} from "@mantine/core";
import {isInRange, isNotEmpty, useForm} from '@mantine/form';
import useRestStore from "@/pages/core/Restaurant/store/restaurantStore";
import {notifications} from "@mantine/notifications";
import {useParams} from "react-router-dom";
import ApiService from "@/services/ApiService";
import {useQuery} from '@tanstack/react-query';
import SelectMenu from "@/components/ui/SelectMenu";
import LocationsMenu from "@/components/ui/SelectLocation";

interface FormValues {
  name: string;
  menuId: string;
  address: string;
  locationId: string;
  city: string;
}

function RestaurantEdit() {
  const form = useForm<FormValues>({
    initialValues: {name: '', address: '', menuId: '', city: '', locationId: ''},
    validate: {
      name: isNotEmpty('Name is required'),
      menuId: isNotEmpty('Menu is required'),
      address: isNotEmpty('Address is required'),
      city: isNotEmpty('City is required'),
      locationId: isNotEmpty('Location is required')
    },
  });
  const {id} = useParams();
  const {updateItem, fetchData, restaurants} = useRestStore()

  if (!id) {
    return <Title>Id is required!</Title>
  }

  useEffect(() => {
    if (restaurants.length > 0) {
      const find = restaurants.find(el => el.id === id)
      if (find) {
        console.log('find', find)
        form.initialize({
          ...find,
          locationId: find.locationId + '',
        });
      }
    }
  }, [restaurants]);

  useEffect(() => {
    fetchData()
    // if (query.data?.payload.restaurant) {
    // form.initialize(query.data?.payload.restaurant);
    // }
  }, []);


  const handleSubmit = async (values: any) => {
    form.validate()
    if (!form.isValid()) {
      return
    }

    const res = await updateItem(values, id)

    if (res.status === 200) {
      notifications.show({
        message: 'Restaurant was saved',
        color: 'green'
      })
    }
  }

  return (
    <Container>
      <Title mb={'lg'} mt={'xl'} pt={'xl'} order={2}>About the restaurant</Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex gap="md" direction="column">
          <TextInput
            value={id}
            label="Restaurant id"
            readOnly={true}
            disabled={true}
            placeholder="Restaurant id"
          />

          <div>
            <TextInput
              {...form.getInputProps('name')}
              label="Name of the restaurant"
              placeholder="Name of the restaurant"
            />
            <InputDescription mt={'xs'}>Please provide the name of the establishment</InputDescription>
          </div>

          <div>
            <TextInput
              {...form.getInputProps('city')}
              label="City"
              placeholder="City"
            />
          </div>

          <SelectMenu
            formParams={form.getInputProps('menuId')}
          />

          <LocationsMenu
            formParams={form.getInputProps('locationId')}
          />

          <div>
            <TextInput
              {...form.getInputProps('address')}
              label="Address"
              size={'md'}
              placeholder="Address"
            />
            <InputDescription mt={'xs'}>Specify the Restaurant address</InputDescription>
          </div>

          <Button
            type={'submit'} mt="md">
            Update
          </Button>
        </Flex>
      </form>
    </Container>
  );
}

export default RestaurantEdit;