import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import s from './registration.module.scss';
import CodeConfirmation from '../../components/CodeConfirmation';
import MobilePhone from '../../components/MobilePhone';

import {
  useRegisterMutation,
  useConfirmMutation,
  useResendCodeMutation,
} from '../../app/api/authApi';

type Method = 'email' | 'phone';

interface IFormInputs {
  name: string;
  email: string;
  phone: string;
  newsletter: boolean;
}

const Registration = () => {
  const [method, setMethod] = useState<Method>('email');
  const [step, setStep] = useState<'form' | 'confirmation'>('form');

  const [
    registerApi, 
    { isLoading: isRegisterLoading, isError: isRegisterError, error: registerError },
  ] = useRegisterMutation();

  const [
    confirmApi,
    { isLoading: isConfirmLoading, isError: isConfirmError, error: confirmError },
  ] = useConfirmMutation();

  const [resendCode] = useResendCodeMutation();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    getValues,
  } = useForm<IFormInputs>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      newsletter: true,
    },
  });

  const handleMethodChange = (newMethod: Method) => {
    if (step === 'form') {
      setMethod(newMethod);
    }
  };

  const onSubmitForm = async (values: IFormInputs) => {
    const identifier = method === 'email' ? values.email : values.phone;

    const payload = {
      identifier,
      is_agree_with_mailing: values.newsletter,
      name: values.name,
      role: 'base_user',
    };

    try {
      await registerApi(payload).unwrap();
      setStep('confirmation'); 
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const handleConfirmCode = async (code: string) => {
    const { email, phone } = getValues();
    const identifier = method === 'email' ? email : phone;

    try {
      const response = await confirmApi({
        identifier,
        submit_code: code,
      }).unwrap();
      console.log('Confirm response:', response);
      window.location.href = 'https://foodmood.menu/'

    } catch (err) {
      console.error('Confirm error:', err);
    }
  };

  const handleResendCode = async () => {
    const { email, phone } = getValues();
    const identifier = method === 'email' ? email : phone;

    try {
      const response = await resendCode({ identifier }).unwrap();
      console.log('Code resent successfully!', response);
    } catch (err) {
      console.error('Resend code error:', err);
    }
  };

  const getMessageFromError = (errorObj: unknown): string | undefined => {
    if (
      errorObj &&
      typeof errorObj === 'object' &&
      'data' in errorObj &&
      errorObj.data &&
      typeof (errorObj.data as any).message === 'string'
    ) {
      return (errorObj as any).data.message;
    }

    return undefined;
  };


  const registerErrorMessage = getMessageFromError(registerError);
  const confirmErrorMessage = getMessageFromError(confirmError);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1 className={s.h1}>Create Account</h1>
      </div>

      <div className={s.registration}>
        <h2 className={s.title}>Registration</h2>
        <div className={s.toggleWrapper}>
          <button
            type="button"
            className={`${s.toggleButton} ${method === 'email' ? s.active : ''}`}
            onClick={() => handleMethodChange('email')}
            disabled={step === 'confirmation'}
          >
            Email
          </button>
          <button
            type="button"
            className={`${s.toggleButton} ${method === 'phone' ? s.active : ''}`}
            onClick={() => handleMethodChange('phone')}
            disabled={step === 'confirmation'}
          >
            Phone Number
          </button>
        </div>

        {step === 'form' && (
          <form className={s.form} onSubmit={handleSubmit(onSubmitForm)}>
            <div className={`${s.formGroup} ${errors.name ? s.invalid : ''}`}>
              <input
                type="text"
                placeholder="Name"
                className={`${s.input} ${errors.name ? s.inputError : ''}`}
                {...register('name', {
                  required: 'Please, enter your name',
                })}
              />
              {errors.name && (
                <p className={s.errorText}>{errors.name.message}</p>
              )}
            </div>

            {method === 'email' && (
              <div
                className={`${s.formGroup} ${errors.email ? s.invalid : ''}`}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className={`${s.input} ${errors.email ? s.inputError : ''}`}
                  {...register('email', {
                    required: 'Please, enter your email',
                  })}
                />
                {errors.email && (
                  <p className={s.errorText}>{errors.email.message}</p>
                )}
              </div>
            )}

            {method === 'phone' && (
              <div
                className={`${s.formGroup} ${errors.phone ? s.invalid : ''}`}
              >
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Please, enter your phone',
                  }}
                  render={({ field, fieldState }) => (
                    <MobilePhone
                      value={field.value}
                      onChange={field.onChange}
                      touched={!!fieldState.error}         
                      error={fieldState.error?.message}       
                    />
                  )}
                />
              </div>
            )}

            <div className={`${s.checkboxGroup} ${errors.newsletter ? s.invalid : ''}`}>
              <input
                type="checkbox"
                id="newsletter"
                className={`${s.checkbox} ${errors.newsletter ? s.inputError : ''}`}
                {...register('newsletter', {
                  required: 'Confirmation required',
                })}
              />
              
              <label htmlFor="newsletter" className={s.checkboxLabel}>
                <span className={s.fakeCheckbox} />
                Yes, I would like to receive newsletters
              </label>
            </div>
            {errors.newsletter && (
              <p className={s.errorText}>{errors.newsletter.message}</p>
            )}

            {isRegisterError && registerErrorMessage && (
              <div className={s.errorText} style={{ marginBottom: '10px' }}>
                {registerErrorMessage}
              </div>
            )}

            <button
              type="submit"
              className={s.submitButton}
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? 'Loading...' : 'Create Account'}
            </button>
          </form>
        )}

        {step === 'confirmation' && (
          <CodeConfirmation
            displayText={
              method === 'email'
                ? `A code has been sent to ${getValues('email')}`
                : `A code has been sent to ${getValues('phone')}`
            }
            didntGetText={
              method === 'email'
                ? "Didn't get the password?"
                : "Didn't get the code?"
            }
            codeLength={4}
            confirmButtonText="Confirm"
            resendButtonText="Resend Code"
            isResendTimerActive={true}
            initialResendTime={59}
            onConfirm={(code) => handleConfirmCode(code)}
            onResend={() => handleResendCode()}
            isConfirmLoading={isConfirmLoading}
            errorMessage={
              isConfirmError
                ? confirmErrorMessage || 'Invalid code.'
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default Registration;
