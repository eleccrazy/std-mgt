import { Typography, Stack, Box } from '@mui/material';
import { colorInfo } from 'constants/index';

interface ProgressBarProps {
  title: string;
  color: string;
  percentage: number;
  count: number;
}

const ProgresBar = ({ title, color, percentage, count }: ProgressBarProps) => {
  return (
    <Stack direction='column' gap={2}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography fontSize={14} fontWeight={600} color='#11142d'>
          {title}
        </Typography>
        {count > 0 && (
          <Typography
            fontSize={14}
            fontWeight={600}
            color='#11142d'
            sx={{ textAlign: 'center' }}
          >
            {count}
          </Typography>
        )}
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
  title,
  studentsPerProgram,
}: {
  perProgramPercent: { program: string; percent: number }[] | undefined;
  studentsPerProgram?:
    | {
        program: string;
        count: number;
      }[]
    | undefined;
  title: string;
}) => {
  const programs = perProgramPercent?.map((data, index) => {
    const matchingProgram = studentsPerProgram?.find(
      (program) => program.program === data.program,
    );
    const count = matchingProgram?.count || 0;
    return {
      name: data.program,
      percent: data.percent,
      color: colorInfo[index],
      count: count,
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
        {title}
      </Typography>
      <Stack my='20px' direction='column' gap={4}>
        {programs &&
          programs.map((program) => (
            <ProgresBar
              key={program.name}
              title={program.name}
              color={program.color}
              percentage={program.percent}
              count={program.count}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default StudentsPerProgram;
