import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/Auth";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import Constants from "expo-constants";

const StackLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const logAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length === 0) {
        console.log("AsyncStorage is empty.");
        return;
      }

      const stores = await AsyncStorage.multiGet(keys);
      stores.forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
    } catch (error) {
      console.error("Error logging AsyncStorage", error);
    }
  };

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

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  useEffect(() => {
    AsyncStorage.getItem("expoPushToken").then((token) => {
      if (!token) {
        registerForPushNotificationsAsync().then((token) => {
          AsyncStorage.setItem("expoPushToken", token);
        });
      }
    });

    // logAsyncStorage();

    AsyncStorage.getItem("hasOpened").then((hasOpened) => {
      if (!hasOpened) {
        router.replace("/onBoarding");
      }
    });
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
        name="onBoarding"
        options={{
          headerShown: false,
        }}
      />
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
