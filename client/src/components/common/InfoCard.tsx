import { Typography, Stack, Box } from '@mui/material';
import { InfoCardProps } from 'interfaces/common';

const InfoCard = ({ title, value }: InfoCardProps) => {
  return (
    <Box
      id='chart'
      flex={1}
      display='flex'
      bgcolor='#f5fff0'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      pl={3.5}
      py={2}
      gap={2}
      borderRadius='15px'
      minHeight='110px'
      width='fit-content'
    >
      <Stack direction='column'>
        <Typography fontSize={14} color='#808191'>
          {title}
        </Typography>
        <Typography
          fontSize={title === 'Status' ? 20 : 24}
          color='#11142d'
          fontWeight={title === 'Status' ? 500 : 700}
          mt={1}
        >
          {value}
        </Typography>
      </Stack>
    </Box>
  );
};

export default InfoCard;
