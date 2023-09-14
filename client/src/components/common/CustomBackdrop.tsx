import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CustomBackdrop = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#1a2cb8', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default CustomBackdrop;
