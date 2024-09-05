import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/Auth";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StackLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // const logAsyncStorage = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     if (keys.length === 0) {
  //       console.log("AsyncStorage is empty.");
  //       return;
  //     }

  //     const stores = await AsyncStorage.multiGet(keys);
  //     stores.forEach(([key, value]) => {
  //       console.log(`Key: ${key}, Value: ${value}`);
  //     });
  //   } catch (error) {
  //     console.error("Error logging AsyncStorage", error);
  //   }
  // };

  // logAsyncStorage();

  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (e) {
  //     // clear error
  //   }

  //   console.log("Done.");
  // };

  // clearAll();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    if (!user?.auth && inAuthGroup) {
      router.replace("/login");
    } else if (user?.auth === true) {
      router.replace("/(protected)/(tabs)");
    }

    // Notifications
    // const subscriptionForeground =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     console.log("Notification received in foreground:", notification);
    //     Alert.alert(
    //       notification.request.content.title,
    //       notification.request.content.body
    //     );
    //   });

    // const subscriptionBackground =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     console.log("Notification response received:", response);
    //   });

    // return () => {
    //   subscriptionForeground.remove();
    //   subscriptionBackground.remove();
    // };
  }, [user]);

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(protected)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}
