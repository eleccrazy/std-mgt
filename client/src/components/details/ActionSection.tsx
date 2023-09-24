import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardHeader,
} from '@mui/material';

const ActionSection = () => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardHeader title='Take Actions' />
      <CardContent></CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ActionSection;
