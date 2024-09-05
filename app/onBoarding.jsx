import { View, Text, Alert, Platform } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

const onBoarding = () => {
  const router = useRouter();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const handleContinue = async () => {
    const allpermissions = await requestAllPermission();
    if (allpermissions) {
      router.replace("/login");
    } else {
      Alert.alert("Permission Required");
    }
  };

  const requestAllPermission = async () => {
    // Camera Permission
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Camera Permission Required");
      return false;
    }

    // Push Notification Permission
    const notificationStatus = await registerForPushNotificationsAsync();
    if (!notificationStatus) {
      Alert.alert("Push Notification Permission Required");
      return false;
    }

    await AsyncStorage.setItem("hasOpened", "true");
    return true; // All permissions granted
  };

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
        return false;
      }
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

      // Save the token to AsyncStorage
      await AsyncStorage.setItem("pushToken", token);
    } else {
      alert("Must use physical device for Push Notifications");
      return false;
    }

    return true; // Push notification permission granted
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
        gap: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
          }}
        >
          𝕴𝖓𝖘𝖙𝖆𝕷𝖎𝖓𝖐
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          gap: 50,
        }}
      >
        <View
          style={{
            paddingHorizontal: 24,
            width: "75%",
            gap: 25,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Publish and See photos from your friends
          </Text>
          <Text style={{ color: "#ECEBED", fontSize: 12 }}>
            InstaLink is more fun when you follow your friends, choose whom you
            want to follow and see their photos on your feed.
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            height: 50,
            marginBottom: 20,
          }}
        >
          <CustomButton text="Continue" action={handleContinue} />
        </View>
      </View>
    </View>
  );
};

export default onBoarding;
