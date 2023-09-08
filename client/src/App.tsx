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
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ProgramDetails from 'components/customization/ProgramDetails';

import dataProvider from '@refinedev/simple-rest';
import routerProvider from '@refinedev/react-router-v6/legacy';
import { Title, Sider, Layout, Header } from 'components/layout';
import { ColorModeContextProvider } from 'contexts';

import LoginPage from 'pages/Login';
import axios from 'axios';

import {
  Home,
  AllStudents,
  AllGuests,
  LeaderBoard,
  Reports,
  Customization,
  AccountPage,
  EditStudent,
  RegisterStudent,
  StudentDetails,
  EditGuests,
  GuestDetails,
  RegisterGuests,
  ScannerPage,
} from 'pages';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: any) => {
  const token = localStorage.getItem('token');
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ email, password }: { email: string; password: string }) => {
      try {
        // Perform your login logic here, e.g., sending a request to the server
        const response = await fetch(
          'http://localhost:3000/api/v1/admins/login',

          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          },
        );
        if (response.ok) {
          // Login successful
          const data = await response.json();
          const { token, admin } = data;
          // Save the authentication token and user data in local storage or state
          localStorage.setItem('token', token);
          localStorage.setItem('admin', JSON.stringify(admin));
          return Promise.resolve();
        } else {
          // Login failed
          const errorData = await response.json();
          const errorMessage = errorData.message || 'Login failed';
          return Promise.reject(errorMessage);
        }
      } catch (error) {
        // Handle any error that occurs during login
        return Promise.reject('Login failed');
      }
    },
    logout: () => {
      const token = localStorage.getItem('token');
      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem('token');

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: async () => null,
    getUserIdentity: async () => {
      const user = localStorage.getItem('admin');
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  // Get the user from local storage
  const user = localStorage.getItem('admin');
  // Check if the user is admin with its role property
  const isAdmin = user ? JSON.parse(user).role === 'admin' : false;
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
              name: 'scan',
              options: { label: 'Scanner' },
              list: ScannerPage,
              icon: <DocumentScannerIcon />,
            },
            {
              name: 'account',
              options: { label: 'Account ' },
              list: AccountPage,
              icon: <AccountCircleOutlined />,
            },
            {
              name: 'programs',
              show: ProgramDetails,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          legacyRouterProvider={routerProvider}
          legacyAuthProvider={authProvider}
          LoginPage={LoginPage}
        ></Refine>
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
