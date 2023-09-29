import {
  Skeleton,
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

const MessagesSectionSkeleton = () => {
  return (
    <Box boxShadow={2} p={2} sx={{ background: '#6CADDC' }} borderRadius={2}>
      <Typography variant='h5' sx={{ color: '#fff' }} p={2}>
        <Skeleton variant='text' width={700} height={30} />
      </Typography>
      <form
        style={{
          marginTop: '20px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <FormControl>
          <FormHelperText sx={style}>
            <Skeleton variant='text' width={150} height={24} />
          </FormHelperText>
          <TextField
            fullWidth
            id='sourceEmail'
            color='info'
            required
            type='email'
            variant='outlined'
            name='sourceEmail'
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>
            <Skeleton variant='text' width={200} height={24} />
          </FormHelperText>
          <TextField
            fullWidth
            id='sourceEmailPassword'
            color='info'
            required
            type='text'
            variant='outlined'
            name='sourceEmailPassword'
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>
            <Skeleton variant='text' width={150} height={24} />
          </FormHelperText>
          <TextField
            fullWidth
            id='host'
            color='info'
            required
            type='text'
            variant='outlined'
            name='host'
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>
            <Skeleton variant='text' width={150} height={24} />
          </FormHelperText>
          <TextField
            fullWidth
            id='port'
            color='info'
            required
            type='text'
            variant='outlined'
            name='port'
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>
            <Skeleton variant='text' width={100} height={24} />
          </FormHelperText>
          <TextField
            fullWidth
            id='subject'
            color='info'
            required
            type='text'
            variant='outlined'
            name='emailSubject'
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>
            <Skeleton variant='text' width={100} height={24} />
          </FormHelperText>
          <TextField
            fullWidth
            id='content'
            color='info'
            required
            variant='outlined'
            type='text'
            name='emailContent'
            multiline
            rows={7}
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' }, // Change 'blue' to the desired color
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>
            <Skeleton variant='text' width={150} height={24} />
          </FormHelperText>
          <TextField
            fullWidth
            id='timeLimit'
            color='info'
            required
            type='number'
            variant='outlined'
            name='timeLimit'
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <Box
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 6,
          }}
        >
          <Skeleton variant='rectangular' width={150} height={60} />
        </Box>
      </form>
    </Box>
  );
};

export default MessagesSectionSkeleton;
