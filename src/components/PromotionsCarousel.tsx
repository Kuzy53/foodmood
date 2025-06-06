// import React from 'react';
// import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { Paper, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Banner from '/Banner.jpeg';
import classes from './Demo.module.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';


const data = [
  {
    image: Banner,
    key: 1
  },
  {
    image: Banner,
    key: 2
  },
  {
    image: Banner,
    key: 3
  },
  {
    image: Banner,
    key: 4
  },
  {
    image: Banner,
    key: 5
  },
  {
    image: Banner,
    key: 6
  },
];

interface CardProps {
  image: string;
  key: number
}

const Card =({image}: CardProps) => {

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})`, height: 280, maxWidth: 384, borderRadius: 24 }}
      className={classes.card}
    >
    </Paper>
  );
}

const PromotionsCarousel:  React.FC = () => {
const mobile = useMediaQuery(`(max-width: 1000px)`);

  const slides = data.map((item) => (
    <Carousel.Slide key={item.key}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
    <Title className={classes.title}>Promotions</Title>
    <Carousel
    height={280}
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 'xl', sm: 2 }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
    </>
  );
}

export default PromotionsCarousel;