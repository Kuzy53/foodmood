import React from "react";
import {Group, Title} from '@mantine/core';
import { Button } from '@mantine/core';
import {IconPlus} from "@tabler/icons-react";
import {TableSort} from "@/components/ui/TableSort/TableSort";


export default function Dashboard() {

  return (
    <>
      <Group justify={'space-between'}>
        <Title>Dash</Title>
        <Button variant="filled" color={'primary'} size="lg" radius={'lg'}>
          Create restaurant
          <IconPlus style={{marginLeft: '7px'}} />
        </Button>
      </Group>

    </>
  )
}
