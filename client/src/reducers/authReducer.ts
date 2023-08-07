type AuthState = {
    user?: any;
    token?: string;
  };
  
  type AuthAction = {
    type: 'SIGN_IN' | 'SIGN_OUT';
    user?: any;
    token?: string;
  };
  
  export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'SIGN_IN':
        return { user: action.user, token: action.token };
      case 'SIGN_OUT':
        return {};
      default:
        return state;
    }
  };