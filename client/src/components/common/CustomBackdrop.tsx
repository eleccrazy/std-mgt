import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

const CustomBackdrop = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Backdrop
        sx={{ color: '#1a2cb8', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default CustomBackdrop;
