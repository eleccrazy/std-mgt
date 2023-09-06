import { Box, Typography } from '@mui/material';
import AddButton from 'components/customization/AddButton';

const dummyAccounts = [
  {
    email: 'example@gmail.com',
    firstName: 'test',
    lastName: 'test2',
    role: 'admin',
    hubId: '9a8b7c6d-5e4f-3g2h-1i0j-9k8l7m6n5o',
  },
  {
    email: 'user1@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'attendant',
    hubId: 'e1a8a1c0-2c39-4a99-a3e2-9d7d4b3b2c7c',
  },
  {
    email: 'user2@gmail.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'attendant',
    hubId: 'c3b8d7a6-9e5f-4b2d-8c1a-6f0e9d8c7b6a',
  },
  {
    email: 'user3@gmail.com',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: 'attendant',
    hubId: 'a9b8c7d6-e5f4-3a2b-1c0d-9e8f7g6h5i4',
  },
  {
    email: 'user4@gmail.com',
    firstName: 'Emily',
    lastName: 'Brown',
    role: 'attendant',
    hubId: '1a2b3c4d-5e6f-7g8h-9i0j-a1b2c3d4e5f',
  },
  {
    email: 'user5@gmail.com',
    firstName: 'David',
    lastName: 'Wilson',
    role: 'attendant',
    hubId: 'a9b8c7d6-e5f4-3a2b-1c0d-9e8f7g6h5i4',
  },
];

const AccountPage = () => {
  return (
    <Box mb={5} display='flex' flexDirection='column' bgcolor='#ffffff' p={3}>
      <Box boxShadow={2} p={2} sx={{ background: '#7cabcf' }} borderRadius={2}>
        <Typography
          variant='h5'
          p={2}
          gutterBottom
          component='div'
          sx={{ color: '#ecebf0', display: 'flex', alignItems: 'center' }}
        >
          Manage Accounts
          <div style={{ marginLeft: 'auto' }}>
            <AddButton
              onClick={() => {}}
              backgroundColor='#230563'
              hoverColor='#21365e'
            />
          </div>
        </Typography>
      </Box>
    </Box>
  );
};

export default AccountPage;
