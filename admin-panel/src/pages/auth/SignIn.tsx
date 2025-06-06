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
import {Link, useNavigate} from "react-router-dom";
import useUserStore from "@/store/main/UserStore";
import useAuth from "@/utils/hooks/useAuth";

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false)
  const {signIn} = useAuth()
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter a email')
      .email('Invalid email'),
    password: yup
      .string()
      .required('Please enter a password')
  });

  const form = useForm({
    initialValues: {
      email: 'urcop@vk.com',
      password: 'SuperPassW0rd@',
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
          <TextInput {...form.getInputProps('email')} name={'email'} label="Email" withAsterisk
                     placeholder="hello@gmail.com" size="md"/>
          <PasswordInput {...form.getInputProps('password')} name={'password'} label="Password"
                         placeholder="Your password" mt="md" size="md"/>
          <Button loading={loading} type={'submit'} fullWidth mt="xl" size="md" mb={'xs'}>
            Login
          </Button>
          <Link to={'/sign-up'}>
            <Button variant="outline" fullWidth>
              Register
            </Button>
          </Link>
          <br/>
          <Link to={'/'}><Text color={'dark'} size={'sm'} fw={'bold'} align={'center'}>Try demo</Text></Link>
          <Link to={'/forgot'}><Text color={'gray'} size={'sm'} align={'center'}>Forgot your password?</Text></Link>
        </div>
      </form>
    </div>
  );
}
