import { CSSProperties } from 'react';
import { BeatLoader, PropagateLoader } from 'react-spinners';
import { Backdrop } from '@mui/material';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

interface CustomSpinnerProps {
  isLoading: boolean;
  color: string;
  size: number;
  background: string;
}

const CustomSpinner = ({
  isLoading,
  color,
  size,
  background,
}: CustomSpinnerProps) => {
  return (
    <Backdrop
      sx={{
        color: '#1a2cb8',
        background: background === 'no' ? 'transparent' : background,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <BeatLoader
        color={color}
        loading={isLoading}
        cssOverride={override}
        size={size}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </Backdrop>
  );
};

export default CustomSpinner;
