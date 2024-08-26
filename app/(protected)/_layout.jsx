import { Redirect, Slot, Stack, Tabs, useRouter } from "expo-router";
import { useAuth } from "../../context/Auth";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
// import { process.env.EXPO_PUBLIC_API_URL } from "@env";
import Constants from "expo-constants";
import * as Device from "expo-device";

export default function TabsLayout() {
  const router = useRouter();
  const { user } = useAuth();
  // const [expoPushToken, setExpoPushToken] = useState();

  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     // Learn more about projectId:
  //     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //     // EAS projectId is used here.
  //     try {
  //       const projectId =
  //         Constants?.expoConfig?.extra?.eas?.projectId ??
  //         Constants?.easConfig?.projectId;
  //       if (!projectId) {
  //         throw new Error("Project ID not found");
  //       }
  //       token = (
  //         await Notifications.getExpoPushTokenAsync({
  //           projectId,
  //         })
  //       ).data;
  //     } catch (e) {
  //       token = `${e}`;
  //     }
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   return token;
  // }

  // const savetokenToServer = async (token) => {
  //   const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Notification/save-token`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token: token,
  //       user_id: user.id,
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) => {
  //     setExpoPushToken(token);
  //     savetokenToServer(expoPushToken);
  //   });
  // }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[id]"
        options={{
          title: "Post",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
            // backgroundColor: "white",
            // height: 100,
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/(tabs)");
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                borderColor: "#323436",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="arrow-back-outline" size={16} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="chat/[id]"
        options={{
          title: "",
          // headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
            // backgroundColor: "white",
            // height: 50,
          },
          headerTintColor: "white",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="searchProfile/[id]"
        options={{
          title: "",
          // headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
            // backgroundColor: "white",
            // height: 50,
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/");
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                borderColor: "#323436",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="arrow-back-outline" size={16} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Messages",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
            // backgroundColor: "white",
            // height: 100,
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/");
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                borderColor: "#323436",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="arrow-back-outline" size={16} color="white" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
