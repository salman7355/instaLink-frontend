import { createContext, useContext, useState } from "react";
import { API_URL } from "@env";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    auth: true,
    id: 3,
    username: "Salman",
    email: "salman@test.com",
    password: "test",
    profilepictureurl: "null",
    followers: 0,
    following: 0,
    dateofbirth: "2002-01-09T22:00:00.000Z",
    mobile: "01234567890",
  });
  // console.log("user", user);

  const register = async (
    username,
    email,
    password,
    profilepictureurl,
    dateofbirth,
    mobile
  ) => {
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          profilepictureurl,
          dateofbirth,
          mobile,
        }),
      });
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      } else {
        setUser({
          auth: true,
          ...data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      } else {
        setUser({
          auth: true,
          ...data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signout = () => {
    setUser({
      auth: false,
    });
  };

  return (
    <AuthContext.Provider value={{ user, signout, signIn, register }}>
      {children}
    </AuthContext.Provider>
  );
}
