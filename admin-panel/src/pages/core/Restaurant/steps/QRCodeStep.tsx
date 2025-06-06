import React from 'react';
import {Title, Text, Container, Flex, Group, Button} from "@mantine/core";
import QRCode from "react-qr-code";

function QrCodeStep({code}: { code: string }) {

  return (
    <Container size={'sm'}>
      <Flex align={'center'} justify={'center'} style={{minHeight: "50vh"}}>
        <Flex direction={'column'} gap={'15px'}>
          <Title order={2}>QRCodeStep</Title>
          <Text mb={'xs'}>Print and place this QR code on tables in your establishment - guests will be able to scan it with their
            smartphone camera to open the menu.</Text>
          {code && (
            <>
              <QRCode size={152}
                      value={code}
                      viewBox={`0 0 152 152`}/>
              <Group>
                <Button>Download QR code</Button>
                <Button variant={'outline'}>Open menu</Button>
              </Group>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}

export default QrCodeStep;
