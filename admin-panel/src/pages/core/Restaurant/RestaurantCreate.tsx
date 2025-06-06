import {Container, Title} from "@mantine/core";
import React, {useState} from 'react';
import {Stepper, Button, Group} from '@mantine/core';
import useRestStepsStore from "@/pages/core/Restaurant/steps/store/restStepsStore";

interface FormValues {
  name: string;
  menuId: string;
  address: string;
  locationId: string;
  city: string;
}

export default function RestaurantCreate() {
  const {activeStep, steps, nextStep, prevStep, setActiveStep} = useRestStepsStore();

  const ComponentToRender = steps[activeStep].component;

  return (
    <Container size={'xl'}>
      <Group align={'flex-start'} gap={4}>
        <Title>Restaurant creation</Title>
        <Stepper active={activeStep} allowNextStepsSelect={false} onStepClick={setActiveStep} style={{flex: 1}} mt={'xs'} ml={'xl'} mr={'xl'}>
          {steps.map((step, index) => (
            <Stepper.Step label={step.label} key={step.label}/>
          ))}
        </Stepper>
      </Group>
      <div style={{marginTop: '20px'}}>
        <ComponentToRender/>
      </div>
    </Container>
  );
}
