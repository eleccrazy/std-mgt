import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

function CardSkeleton() {
  return (
    <Box
      id='chart'
      flex={1}
      display='flex'
      flexDirection='row'
      bgcolor='#fcfcfc'
      justifyContent='space-between'
      alignItems='center'
      px={2.5}
      py={2}
      gap={2}
      borderRadius='15px'
      minHeight='110px'
      width='fit-content'
      position='relative' // Added position relative to the Box component
    >
      <Skeleton animation='wave' width='100%' />
    </Box>
  );
}

export default CardSkeleton;
