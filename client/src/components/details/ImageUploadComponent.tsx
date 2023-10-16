import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';
import ConfirmationDialog from 'components/common/ConfirmationDialog';

interface ImageUploadComponentProps {
  // Incase, I have additional props
}

interface ImageUploadComponentState {
  imageFile: File | null;
  previewImage: string | null;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = () => {
  const [state, setState] = useState<ImageUploadComponentState>({
    imageFile: null,
    previewImage: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files ? files[0] : null;
    if (file) {
      setState({
        imageFile: file,
        previewImage: URL.createObjectURL(file),
      });
    }
  };

  const handleSaveImage = () => {
    // TODO: Make an api call to the backend to save the image.
  };

  return (
    <Stack
      direction='column'
      alignItems='center'
      justifyContent='space-between'
      spacing={2}
    >
      <img
        src={
          state.previewImage
            ? state.previewImage
            : '../../../src/assets/photo.JPG'
        }
        alt='Preview image'
        width={200}
        height={250}
      />
      <input type='file' accept='image/*' onChange={handleImageUpload} hidden />
      <Button
        variant='outlined'
        component='label'
        startIcon={<CloudUploadOutlined />}
        sx={{
          color: '#174281',
          backgroundColor: '#f5f5f5',
          textTransform: 'capitalize',
          '&:hover': {
            opacity: 0.9,
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        Upload Image
        <input
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          hidden
        />
      </Button>
      <Button
        variant='contained'
        onClick={handleSaveImage}
        sx={{
          color: '#174281',
          background: '#f5f5f5',
          textTransform: 'capitalize',
          '&:hover': {
            opacity: 0.9,
            backgroundColor: '#f5f5f5',
          },
        }}
        disabled={state.imageFile ? false : true}
      >
        Save
      </Button>
    </Stack>
  );
};

export default ImageUploadComponent;
