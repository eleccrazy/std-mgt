import { Card, CardContent, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AccountData } from 'interfaces/common';

const keyStyle = {
  fontWeight: 800,
  fontSize: 16,
  color: '#000',
  display: 'inline-block',
  minWidth: 80, // Set a minimum width for the keys
};

const valueStyle = {
  fontWeight: 500,
  fontSize: 16,
  color: '#ffffff',
  display: 'inline-block',
};

const AccountList = ({ account }: { account: AccountData }) => {
  return (
    <Card
      sx={{
        marginBottom: '8px',
        width: '100%',
        backgroundColor: '#69a0c9',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3,
        marginTop: 3,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant='body1'>
          <span style={keyStyle}>Email: </span>{' '}
          <span style={valueStyle}>{account.email}</span>
        </Typography>
        <Typography variant='body2'>
          <span style={keyStyle}>Role: </span>{' '}
          <span style={valueStyle}>
            {account.role == 'admin' ? 'Admin' : 'Attendant'}
          </span>
        </Typography>
        <Typography variant='body2'>
          <span style={keyStyle}>Hub: </span>
          <span style={valueStyle}>
            {account.hub ? account.hub.name : 'None'}
          </span>
        </Typography>
      </div>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Card>
  );
};

export default AccountList;
