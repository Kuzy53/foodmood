import React, { useState } from 'react';
import {TextInput, Title, Group, Container, Flex, Grid, SimpleGrid} from '@mantine/core';
import { useAppSelector } from '@/store';

function Profile() {
  const { user } = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user.name || '',
    second_name: user.second_name || '',
    surname: user.surname || '',
    email: user.email || '',
    phone: user.phone || '',
    photo: user.photo || '',
    role: user.role || '',
    is_verified: user.is_verified ? 'Yes' : 'No',
    google_id: user.google_id || '',
    created_at: user.created_at || '',
    updated_at: user.updated_at || '',
    deleted_at: user.deleted_at || ''
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.currentTarget.value });
  };

  return (
    <Container>
      <Title>Account details</Title>

      <SimpleGrid cols={2} mt="md">
        <TextInput
          label="Name"
          value={formData.name}
          onChange={handleChange('name')}
        />
        <TextInput
          label="Second Name"
          value={formData.second_name}
          onChange={handleChange('second_name')}
        />
        <TextInput
          label="Surname"
          value={formData.surname}
          onChange={handleChange('surname')}
        />
        <TextInput
          label="Email"
          value={formData.email}
          onChange={handleChange('email')}
        />
        <TextInput
          label="Phone"
          value={formData.phone}
          onChange={handleChange('phone')}
        />
        <TextInput
          label="Photo URL"
          value={formData.photo}
          onChange={handleChange('photo')}
        />
        <TextInput
          label="Role"
          value={formData.role}
          onChange={handleChange('role')}
        />

        <TextInput
          label="Created At"
          value={new Date(formData.created_at).toUTCString()}
          readOnly={true}
          disabled={true}
          onChange={handleChange('created_at')}
        />
        <TextInput
          label="Updated At"
          readOnly={true}
          disabled={true}
          value={new Date(formData.updated_at).toUTCString()}
          onChange={handleChange('updated_at')}
        />

      </SimpleGrid>
    </Container>
  );
}

export default Profile;
