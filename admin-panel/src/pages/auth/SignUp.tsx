import React, {useState} from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title, Text, Anchor, Flex, Box,
} from '@mantine/core';
import classes from './SignIn.module.css';
import * as yup from 'yup';
import {useForm, yupResolver} from "@mantine/form";
import useAuth from "@/utils/hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import {IconArrowLeft} from "@tabler/icons-react";

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false)
  const {signUp, confirmEmail} = useAuth()
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter a email')
      .email('Invalid email'),
    password: yup
      .string()
      .required('Please enter a password'),
    name: yup
      .string()
      .required('Please enter a name'),
    phone: yup
      .string()
      .required('Please enter a phone')
  });

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: { email: string, password: string, phone: string, name: string }) {
    setLoading(true)
    try {
      const res = await signUp(values)

      if(res?.status === 'success'){
        navigate(`/confirm-pass?email=${encodeURIComponent(values.email)}`);
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={classes.box}>
          <Flex justify={'center'} mb={'md'}>
            <img
              className={classes.logo}
              alt={'Mantine Logo'}
              src={'/logo.png'}
            />
          </Flex>
          <Flex direction={'column'} gap={10}>
            <TextInput {...form.getInputProps('name')} name={'name'} label="Name" withAsterisk
                       placeholder="What is your name?" size="md"/>
            <TextInput {...form.getInputProps('phone')} name={'phone'} label="Phone" withAsterisk
                       placeholder="Your phone number" size="md"/>
            <TextInput {...form.getInputProps('email')} name={'email'} label="Email" withAsterisk
                       placeholder="Enter your email" size="md"/>
            <PasswordInput {...form.getInputProps('password')} name={'password'} label="Password"
                           placeholder="Your password" size="md"/>
            <Button variant="outline" fullWidth loading={loading} type={'submit'} mt={'md'}>
              Register
            </Button>
          </Flex>

          <Text color={'gray'} size={'10px'} mt={'lg'} align={'center'}>By registering in the FoodMood service, you
            accept all the terms of the offer, the policy regarding the processing of personal data and give your
            consent to the processing of personal data</Text>
          <Link to={'/sign-in'}><Text color={'gray'}  size={'sm'} align={'center'} mt={'md'}>
            <Flex justify={'center'}>
              <IconArrowLeft />
              <Box mt={'2px'} ml={'2px'}>Back</Box>
            </Flex>
          </Text></Link>
        </div>
      </form>
    </div>
  );
}
