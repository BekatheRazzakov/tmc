import React, { useRef } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FileUpload = ({ handleFileChange, removeImage, file, label, isByte }) => {
  const inputRef = useRef(null);

  const onFileChange = (e) => {
    if (handleFileChange) {
      handleFileChange(e);
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileChange}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <Box className="form-images">
            {file ? (
              <Typography className="image-labels">
                <img
                  className="new-good-img-preview"
                  src={isByte ? file : URL.createObjectURL(file)}
                  alt={label}
                  loading="lazy"
                />
              </Typography>
            ) : (
              label
            )}
          </Box>
        </Grid>
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'stretch',
          }}
        >
          {!file ? (
            <Button
              variant="contained"
              onClick={activateInput}
              style={{ fontSize: '10px' }}
            >
              Загрузить
            </Button>
          ) : (
            <Button
              className="good-form-delete-image"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => {
                if (removeImage && inputRef.current) {
                  removeImage();
                  inputRef.current.value = '';
                }
              }}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default FileUpload;
