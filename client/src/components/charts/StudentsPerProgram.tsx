import { Typography, Stack, Box } from '@mui/material';
import { colorInfo } from 'constants/index';

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
        <Typography fontSize={14} fontWeight={600} color='#174281'>
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

const StudentsPerProgram = ({
  perProgramPercent,
}: {
  perProgramPercent: { program: string; percent: number }[] | undefined;
}) => {
  const programs = perProgramPercent?.map((data, index) => {
    return {
      name: data.program,
      percent: data.percent,
      color: colorInfo[index],
    };
  });
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
        Total Attendees Per Program
      </Typography>
      <Stack my='20px' direction='column' gap={4}>
        {programs &&
          programs.map((program) => (
            <ProgresBar
              key={program.name}
              title={program.name}
              color={program.color}
              percentage={program.percent}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default StudentsPerProgram;
