import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigation } from '@refinedev/core';

interface ProgramCardProps {
  id: string;
  name: string;
}

const ProgramCard = ({ id, name }: ProgramCardProps) => {
  const { push } = useNavigation();
  const handleCardClick = () => {
    push(`/customization/show?type=program&id=${id}`);
  };
  return (
    <Card
      sx={{
        maxWdth: 345,
        background: '#2B6EB2',
        height: 100,
        '&:hover': {
          background: '#174281',
        },
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography gutterBottom component='div' sx={{ color: '#ecebf0' }}>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Click for more details
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProgramCard;
