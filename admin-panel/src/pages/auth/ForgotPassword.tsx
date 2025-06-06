import React, {useState} from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title, Text, Anchor, Flex,
} from '@mantine/core';
import classes from './SignIn.module.css';
import * as yup from 'yup';
import {useForm, yupResolver} from "@mantine/form";
import useAuth from "@/utils/hooks/useAuth";
import {Link} from "react-router-dom";
import {IconArrowLeft} from "@tabler/icons-react";

export default function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false)
  const {signIn} = useAuth()
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter a email')
      .email('Invalid email'),
  });

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: { email: string, password: string }) {
    setLoading(true)
    try {
      const res = await signIn(values)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)} className={classes.wrapper}>
        <div className={classes.box}>
          <Flex justify={'center'} mb={'md'}>
            <img
              className={classes.logo}
              alt={'Mantine Logo'}
              src={'/logo.png'}
            />
          </Flex>
          <Text align={'center'} size={'sm'} mb={'xl'} pt={'xs'}>Enter the email address to which the account is
            registered</Text>
          <TextInput {...form.getInputProps('email')} name={'email'} label="Email" withAsterisk
                     placeholder="hello@gmail.com" size="md"/>

          <Button variant="outline" fullWidth loading={loading} type={'submit'} mt={'md'}>
            Reset password
          </Button>
          <br/>
          <Link to={'/sign-in'}>
            <Text color={'gray'} size={'sm'} fw={'bold'} align={'center'}>
              <Flex justify={'center'} gap={'3px'}>
                <IconArrowLeft/>
                Back
              </Flex>
            </Text>
          </Link>
        </div>
      </form>
    </div>
  );
}
