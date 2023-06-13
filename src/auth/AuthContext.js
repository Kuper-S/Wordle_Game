import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export function AuthProvider({ children, value }) {
    const [user, setUser] = useState({
        ...value,
        username: '',
        avatar: '',
      });

  return (
    <AuthContext.Provider value={{ ...user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}

export default AuthContext;