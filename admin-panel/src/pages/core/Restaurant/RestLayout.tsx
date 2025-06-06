import React from 'react';
import {Container, Group, Stepper, Title} from "@mantine/core";
import {useLocation} from "react-router-dom";

function RestLayout({children}) {
  const location = useLocation();

  // Определяем activeStep на основе пути
  const getActiveStep = () => {
    if (location.pathname.includes('/uploadImage')) {
      return 1;
    }
    if (location.pathname.includes('/create')) {
      return 0;
    }
    return 0; // Шаг по умолчанию
  };

  const activeStep = getActiveStep();

  const steps = [
    {label: 'About the restaurant'},
    {label: 'QR code'},
  ]

  return (
    <div>
      <Container size={'xl'}>
        <Group align={'flex-start'} gap={4}>
          <Title>Restaurant creation</Title>
          <Stepper active={activeStep} allowNextStepsSelect={false} style={{flex: 1}} mt={'xs'} ml={'xl'} mr={'xl'}>
            {steps.map((step, index) => (
              <Stepper.Step label={step.label} key={step.label}/>
            ))}
          </Stepper>
        </Group>
        <div style={{marginTop: '20px'}}>
          {children}
        </div>
      </Container>
    </div>
  );
}

export default RestLayout;
