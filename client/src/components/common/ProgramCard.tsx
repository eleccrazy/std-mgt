import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ProgramCard = ({ name }: { name: string }) => {
  return (
    <Card sx={{ maxWdth: 345, background: '#230563', height: 100 }}>
      <CardActionArea>
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
