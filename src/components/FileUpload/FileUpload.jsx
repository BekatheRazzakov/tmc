import React from 'react';
import { Box, Button } from "@mui/material";

const FileUpload = ({file, handleFileChange}) => {
  return (
    <Box className='new-good-img-preview-box'>
      {file ? <img
        className='new-good-img-preview'
        src={URL.createObjectURL(file)}
        alt={file}
        loading='lazy'
      /> : <span className='new-good-img-preview-label'>загрузить фото</span>}
      <Button
        className="new-good-img-upload-btn"
        variant='contained'
        component='label'
      >
        загрузить
        <input
          type='file'
          hidden
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
};

export default FileUpload;