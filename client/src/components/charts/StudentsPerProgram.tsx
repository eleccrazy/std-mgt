import { Typography, Stack, Box } from '@mui/material';
import { propertyReferralsInfo } from 'constants/index';

interface ProgressBarProps {
  title: string;
  color: string;
  percentage: number;
}

const ProgresBar = ({ title, color, percentage }: ProgressBarProps) => {
  return (
    <Stack direction='column' gap={2}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography fontSize={14} fontWeight={600} color='#11142d'>
          {title}
        </Typography>
        <Typography fontSize={14} fontWeight={600} color='#475be8'>
          {percentage}%
        </Typography>
      </Stack>
      <Box
        width='100%'
        height='10px'
        borderRadius='10px'
        bgcolor='#e6e6e6'
        position='relative'
      >
        <Box
          width={`${percentage}%`}
          height='100%'
          borderRadius={1}
          bgcolor={color}
          position='absolute'
        ></Box>
      </Box>
    </Stack>
  );
};

const StudentsPerProgram = () => {
  return (
    <Box
      p={4}
      bgcolor={'#fcfcfc'}
      id='chart'
      minWidth={490}
      display='flex'
      flexDirection='column'
      borderRadius='15px'
    >
      <Typography fontSize={18} fontWeight={600} color='#11142d'>
        Registered Students Per Program
      </Typography>
      <Stack my='20px' direction='column' gap={4}>
        {propertyReferralsInfo.map((item, index) => (
          <ProgresBar
            key={item.title}
            title={item.title}
            color={item.color}
            percentage={item.percentage}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default StudentsPerProgram;
