import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, SvgIconProps } from '@mui/material';

interface ProgramCardProps {
  title: string; // Accept title as a string
  image: string; // Accept image as a string
}


const ProgramCard = ({title, image} : ProgramCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', justifyContent: 'space-between', flexDirection: 'initial', flexGrow: 1}}>
      <CardActionArea sx={{display: 'flex', flexGrow: 1}}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProgramCard;
