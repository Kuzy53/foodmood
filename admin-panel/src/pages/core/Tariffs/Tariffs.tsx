import React from 'react';
import {Box, Button, Flex, SimpleGrid, Title} from "@mantine/core";
import classes from './Tariffs.module.css'
import useUserStore from "@/store/main/UserStore";
import {useAppSelector} from "@/store";
import {Link} from "react-router-dom";

function Tariffs(props) {
  const {user} = useAppSelector((state) => state.auth.user);


  return (
    <div>
      <Flex justify={'space-between'}>
        <Title>Tariffs</Title>
        {user && user.role === 'admin' &&
         <Link to={'/tariffs/edit'}>
           <Button>
             Edit tariffs
           </Button>
         </Link>
        }
      </Flex>
      <Flex gap={'24px'} mt={'24px'}>
        <Box maw={'456px'}><b>24/7 Support</b>: Our dedicated support team is available around the clock to assist you with any issues or
          questions</Box>
        <Box maw={'442px'}><b>Setup Assistance</b>: We provide comprehensive help in setting up your menu and integrating additional features
          to enhance your service</Box>
      </Flex>

      <SimpleGrid cols={3} gap={'24px'} mt={'48px'} pb={'100px'}>
        <Box>
          <Box className={classes.card + ' ' + classes.card_outlined}>
            <Title order={2}>15 Days</Title>
            <Box mt={'40px'} className={classes.text}>Free Trial </Box>
          </Box>
          <Flex direction={'column'} gap={'20px'} className={classes.card + ' ' + classes.card_outlined}>
            <Box className={classes.text}>Experience the full potential</Box>
            <Box className={classes.text}>No commitment</Box>
            <Box className={classes.text}>No risk</Box>
            <Button w={'fit-content'} size={'lg'} mt={'20px'}>Try now</Button>
          </Flex>
        </Box>
        <Box>
          <Box className={classes.card + ' ' + classes.card_filled}>
            <Title order={2}>Subscription</Title>
            <Box mt={'40px'} className={classes.text}>$80 per month</Box>
          </Box>
          <Flex direction={'column'} gap={'20px'} className={classes.card + ' ' + classes.card_filled}>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Button w={'fit-content'} color={'black'} mt={'20px'} size={'lg'}>Pay</Button>
          </Flex>
        </Box>
        <Box>
          <Box className={classes.card + ' ' + classes.card_filled_black} pos={'relative'}>
            <Title order={2}>Annual plan</Title>
            <Box mt={'40px'} className={classes.text}>$672 per year</Box>

            <Button className={classes.disc}>
              10% discount
            </Button>
          </Box>
          <Flex direction={'column'} gap={'20px'} className={classes.card + ' ' + classes.card_filled_black}>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Box className={classes.text}>......</Box>
            <Button w={'fit-content'} mt={'20px'} size={'lg'}>Pay</Button>
          </Flex>
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default Tariffs;