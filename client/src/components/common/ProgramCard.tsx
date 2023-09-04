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
    push(`/programs/show?id=${id}`);
  };
  return (
    <Card sx={{ maxWdth: 345, background: '#230563', height: 100 }}>
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
