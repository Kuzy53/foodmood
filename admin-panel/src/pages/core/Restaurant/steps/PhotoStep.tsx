import React, {useState} from 'react';
import {Container, Title, FileInput, Image, Text, Box} from '@mantine/core';
import classes from './Steps.module.css';

function PhotoStep({formParams}: any) {
  return (
    <Box>
      <Box>
        <FileInput
          clearable
          accept="image/png,image/jpeg"
          label="Upload files"
          placeholder="Upload image png, jpg"
          className={classes.fileInput}
          {...formParams}
        />
      </Box>
      {formParams.value && !formParams.error && (
        <div  className={classes.imageBox}>
          <div className={classes.imageTitle}>Safe zone</div>
          <Image
            src={typeof formParams.value === 'object' ? URL.createObjectURL(formParams.value) : formParams.value}
            alt="Preview"
            className={classes.imagePreview}
          />
        </div>
      )}
    </Box>
  );
}

export default PhotoStep;
