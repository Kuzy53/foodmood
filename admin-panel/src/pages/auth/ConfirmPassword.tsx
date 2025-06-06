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

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false)
  const {signUp, confirmEmail} = useAuth()

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter a email')
      .email('Invalid email'),
    submit_code: yup
      .string()
      .required('Please enter a submit_code'),
  });

  const formConfirm = useForm({
    initialValues: {
      email: '',
      submit_code: ''
    },
  });

  async function handleConfirm(values: { email: string, submit_code: string }) {
    setLoading(true)
    try {
      const res = await confirmEmail({
        submit_code: values.submit_code,
        email: values.email
      })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={formConfirm.onSubmit(handleConfirm)}>
        <TextInput {...formConfirm.getInputProps('email')} name={'email'} label="email" withAsterisk
                   placeholder="Your phone email" size="md"/>
        <TextInput {...formConfirm.getInputProps('submit_code')} name={'submit_code'} label="submit_code" withAsterisk
                   placeholder="Your phone submit_code" size="md"/>
        <Button variant="outline" fullWidth loading={loading} type={'submit'} mt={'md'}>
          Confirm
        </Button>
      </form>
    </div>
  );
}
