import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    auth: true,
    name: "salman",
  });
  // console.log("user", user);

  const register = () => {
    setUser({
      auth: true,
      name: "salman",
    });
  };

  const signIn = () => {
    setUser({
      auth: true,
      name: "salman",
    });
  };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signout, signIn, register }}>
      {children}
    </AuthContext.Provider>
  );
}
