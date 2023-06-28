import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// Define a custom interface for program card props
interface ProgramCardProps {
  title: string; // Accept title as a string
  summary: string; // Accept summary as a string
  image: string; // Accept image as a string
}

/*
I just destructured the props with ES6 destructuring syntax. Then, I typed props as a ProgramCardProps
custom interface that I have defined above in this file. This makes sure that the props we are receiving are
of the appropriate type.
*/

const ProgramCard = ({ title, summary, image }: ProgramCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image='src\assets\se-image.jpg'
          alt='software engineering'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Programs
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Edit or add a program
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProgramCard;
