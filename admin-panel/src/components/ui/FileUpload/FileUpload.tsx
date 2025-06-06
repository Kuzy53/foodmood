import React, {useEffect, useState} from 'react';
import {Box, FileInput, Flex, Image, InputDescription} from "@mantine/core";
import classes from './FileUpload.module.css'

function FileUpload({formParams, oldImage, description}: {
  formParams: any,
  oldImage?: string;
  description?: string;
}) {
  const [newPreview , setNewPreview ] = useState(null);

  useEffect(() => {
    if(oldImage && formParams.value && formParams.value !== oldImage){
      setNewPreview(URL.createObjectURL(formParams.value));
    }else{
      setNewPreview(null);
    }
  }, [formParams]);

  return (
    <Box>
      <Flex gap={"10px"}>
        {oldImage && <Box pos={'relative'}  className={classes.wrp}>
          <Image
            src={oldImage}
            key={oldImage}
            radius={'5px'} mb={'5px'}
            className={classes.image}
          />
          <div className={classes.badge}>Old Image</div>
        </Box>}
        {newPreview &&
          <Box pos={'relative'}  className={classes.wrp}>
            <Image
              src={newPreview}
              key={newPreview}
              radius={'5px'} mb={'5px'}
              className={classes.image}
            />
            <div className={classes.badge}>New Image</div>
          </Box>
        }

      </Flex>
      <FileInput
        label="Upload a photo of the dish"
        placeholder="png, jpg"
        clearable={true}
        {...formParams}
      />
      {description &&
        <InputDescription mt={'5px'}>{description}</InputDescription>
      }
    </Box>
  );
}

export default FileUpload;