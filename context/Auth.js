import { createContext, useContext, useEffect, useState } from "react";
// import { process.env.EXPO_PUBLIC_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    auth: false,
  });
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          console.log("No user data found in AsyncStorage");
        }
      } catch (error) {
        console.log("Failed to load user data from AsyncStorage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const register = async (
    username,
    email,
    password,
    profilepictureurl,
    dateofbirth,
    mobile
  ) => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users/register`,
        {
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
        }
      );
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      } else {
        setUser({
          auth: true,
          ...data,
        });

        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            auth: true,
            ...data,
          })
        );

        console.log("User data saved in AsyncStorage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      } else {
        setUser({
          auth: true,
          ...data,
        });
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            auth: true,
            ...data,
          })
        );

        console.log("User data saved in AsyncStorage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    await AsyncStorage.removeItem("user");
    // Update the application state to reflect that the user is signed out
    setUser({
      auth: false,
    });
    console.log("User signed out and removed from AsyncStorage");
  };

  return (
    <AuthContext.Provider value={{ user, signout, signIn, register }}>
      {!isloading && children}
    </AuthContext.Provider>
  );
}
