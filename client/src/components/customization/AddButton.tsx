import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({
  onClick,
  backgroundColor,
  hoverColor,
}: {
  onClick: () => void;
  backgroundColor: string;
  hoverColor: string;
}) => {
  return (
    <Button
      variant='contained'
      color='primary'
      sx={{
        background: backgroundColor,
        borderRadius: '50%', // Make the button circular
        width: '56px',
        height: '56px',
        '&:hover': {
          backgroundColor: hoverColor, // Set the background color on hover
        },
      }}
      onClick={onClick}
    >
      <AddIcon />
    </Button>
  );
};
export default AddButton;
