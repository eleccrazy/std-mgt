import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      variant='contained'
      color='primary'
      sx={{
        background: '#230563',
        borderRadius: '50%', // Make the button circular
        width: '56px',
        height: '56px',
        '&:hover': {
          backgroundColor: '#21365e', // Set the background color on hover
        },
      }}
      onClick={onClick}
    >
      <AddIcon />
    </Button>
  );
};
export default AddButton;
