import React, { createContext, useEffect, useState } from 'react';

interface IInitState {
  login: boolean;
}

const initState = {
  login: false,
};
export interface IAuthContext {
  AuthState: IInitState;
  setMode: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [Auth, setAuth] = useState(initState);
 
  const setMode = () => {
    setAuth((prev) => ({
      ...prev,
      mode: !prev.login,
    }));
  };

  const value: IAuthContext = {
    setMode,
    AuthState: Auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
