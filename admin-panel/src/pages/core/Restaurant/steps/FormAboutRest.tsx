import React from 'react';
import {Container, FileInput, Flex, Image, InputDescription, Text, Title} from "@mantine/core";
import {Button, TextInput} from '@mantine/core';
import SelectMenu from "@/components/ui/SelectMenu";
import LocationsMenu from "@/components/ui/SelectLocation";
import RestLayout from "@/pages/core/Restaurant/RestLayout";
import {isNotEmpty, useForm} from "@mantine/form";
import useStore from "@/store/main/StoreTemplate";
import {notifications} from "@mantine/notifications";
import useRestStepsStore from "@/pages/core/Restaurant/steps/store/restStepsStore";
import classes from "@/pages/core/Restaurant/steps/Steps.module.css";
import {uploadFile} from "@/fetchs/files";
import PhotoStep from "@/pages/core/Restaurant/steps/PhotoStep";

interface FormValues {
  name: string;
  menuId: string;
  address: string;
  locationId: string;
  photo: string | File;
  city: string;
}

function FormAboutRest() {
  const form = useForm<FormValues>({
    initialValues: {name: '', address: '', menuId: '', city: '', locationId: '', photo: ''},
    validate: {
      name: isNotEmpty('Name is required'),
      menuId: isNotEmpty('Menu is required'),
      address: isNotEmpty('Address is required'),
      city: isNotEmpty('City is required'),
      photo: isNotEmpty('Photo is required'),
      locationId: isNotEmpty('Location is required')
    },
  });

  const {createItem, loading} = useStore()

  const handleSubmit = async (values: any) => {
    form.validate()
    if (!form.isValid()) {
      return
    }

    let photo = form.values.photo

    if(typeof photo === 'object'){
      photo = await uploadFile(photo);
    }

    if(!photo){
      notifications.show({message: "Photo is required"})
      return
    }

    const res = await createItem('restaurants/restaurant', {
      restaurant: {
        ...values,
        locationId: +values.locationId,
        photo: photo
      }
    })

    if (res.status === 200) {
      notifications.show({
        message: 'Restaurant was created',
        color: 'green'
      })
    }
  }

  return (
    <RestLayout>
      <Container>
        <Title mb={'lg'} mt={'xl'} pt={'xl'} order={2}>
          About the restaurant</Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex gap="md" direction="column">
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

            <PhotoStep
              key={form.getInputProps('photo')}
              formParams={form.getInputProps('photo')}
            />

            <Button
              type={'submit'} mt="md"
              loading={loading}
            >
              Next
            </Button>
          </Flex>
        </form>
      </Container>
    </RestLayout>
  );
}

export default FormAboutRest;