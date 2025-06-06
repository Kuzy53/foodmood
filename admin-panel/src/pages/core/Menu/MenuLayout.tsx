import React from 'react';
import {Button, Container, Flex, Group, Stepper, Title} from "@mantine/core";
import {Link, useLocation, useParams} from "react-router-dom";

function RestLayout({children}) {
  const location = useLocation();

  const getActiveStep = () => {
    if (location.pathname.includes('/modifiers')) {
      return 3;
    }
    if (location.pathname.includes('/dishes')) {
      return 2;
    }
    if (location.pathname.includes('/categories')) {
      return 1;
    }
    if (location.pathname.includes('/create')) {
      return 0;
    }
    return 0;
  };

  const activeStep = getActiveStep();
  const {id} = useParams()

  const steps = [
    { label: 'About the menu', path: '/menu/:id', nextStep: '/categories', },
    { label: 'Categories', path: '/menu/:id/categories', nextStep: '/dishes',  prevStep: '/'},
    { label: 'Dishes', path: '/menu/:id/dishes', nextStep: '/modifiers', prevStep: '/categories' },
    { label: 'Modifiers', path: '/menu/:id/modifiers',   prevStep: '/dishes' },
  ];


  return (
    <div>
      <Container size={'xl'}>
        <Group align={'flex-start'} gap={4}>
          <Title>Menu creation</Title>
          <Stepper active={activeStep} allowNextStepsSelect={true} style={{flex: 1}} mt={'xs'} ml={'xl'} mr={'xl'}>
            {steps.map((step, index) => (
              <Stepper.Step label={step.label} key={step.label}/>
            ))}
          </Stepper>
        </Group>
        <div style={{marginTop: '20px'}}>
          {children}
        </div>

        {id && (
          <Flex gap={'10px'} justify={'flex-end'} mt={'20px'}>
            {steps[activeStep]?.prevStep && (
              <Link to={`/menu/${id}${steps[activeStep]?.prevStep}`}>
                <Button type="submit" variant={'outline'}>Prev Step</Button>
              </Link>
            )}
            {steps[activeStep]?.nextStep && (
              <Link to={`/menu/${id}${steps[activeStep]?.nextStep}`}>
                <Button type="submit">Next Step</Button>
              </Link>
            )}
          </Flex>
        )}

      </Container>
    </div>
  );
}

export default RestLayout;
