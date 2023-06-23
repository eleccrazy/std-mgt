import { Refine, LegacyAuthProvider as AuthProvider } from '@refinedev/core';
import {
  notificationProvider,
  RefineSnackbarProvider,
  ReadyPage,
  ErrorComponent,
} from '@refinedev/mui';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import SchoolIcon from '@mui/icons-material/School';
import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import DashboardIcon from '@mui/icons-material/Dashboard';

import dataProvider from '@refinedev/simple-rest';
import routerProvider from '@refinedev/react-router-v6/legacy';
import { Title, Sider, Layout, Header } from 'components/layout';
import { ColorModeContextProvider } from 'contexts';

import {
  Login,
  Home,
  AllStudents,
  AllGuests,
  LeaderBoard,
  Reports,
  Customization,
  ProfilePage,
  EditStudent,
  RegisterStudent,
  StudentDetails,
  EditGuests,
  GuestDetails,
  RegisterGuests,
} from 'pages';

function App() {
  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider('http://localhost:3000/api/v1')}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: 'dashboard',
              list: Home,
              options: { label: 'Dashboard' },
              icon: <DashboardIcon />,
            },
            {
              name: 'students',
              list: AllStudents,
              show: StudentDetails,
              create: RegisterStudent,
              edit: EditStudent,
              icon: <PeopleAltOutlined />,
            },
            {
              name: 'guests',
              list: AllGuests,
              show: GuestDetails,
              create: RegisterGuests,
              edit: EditGuests,
              icon: <SchoolIcon />,
            },
            {
              name: 'leader-board',
              options: { label: 'Leader Board' },
              list: LeaderBoard,
              icon: <LeaderboardIcon />,
            },
            {
              name: 'reports',
              list: Reports,
              icon: <SummarizeIcon />,
            },
            {
              name: 'customization',
              list: Customization,
              icon: <RoomPreferencesIcon />,
            },
            {
              name: 'my-profile',
              options: { label: 'My Profile ' },
              list: ProfilePage,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          legacyRouterProvider={routerProvider}
          LoginPage={Login}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
