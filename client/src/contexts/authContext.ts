import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { authReducer } from '../reducers/authReducer';

interface AuthContextType {
  auth: any;
  dispatch: React.Dispatch<any>;
  header: AxiosRequestConfig;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = () => {
  const [auth, dispatch] = useReducer(authReducer, {}, () => {
    const localData = localStorage.getItem('auth');
    return localData ? JSON.parse(localData) : {};
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const header: AxiosRequestConfig = { headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {} };

  useEffect(() => {
    if (auth.user) {
      axios
        .post(`${'apiaddress'}/users/${auth.user.id}/token`, { token: auth.token }, header)
        .catch((err) => dispatch({ type: 'SIGN_OUT' }));
    }
  }, [ header, dispatch, auth.user, auth.token]);

//   return (
//     <AuthContext.Provider value={{ auth, dispatch, header }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
};

export default AuthContextProvider;