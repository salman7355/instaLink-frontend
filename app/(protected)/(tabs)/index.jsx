import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  LogBox,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import Story from "../../../components/Story";
import Post from "../../../components/Post";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useAuth } from "../../../context/Auth";
// import { process.env.EXPO_PUBLIC_API_URL } from "@env";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [stories, setStories] = useState([]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };

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

  const savetokenToServer = async () => {
    const token = await AsyncStorage.getItem("expoPushToken");
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/Notification/save-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          user_id: user.id,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const fetchPosts = async () => {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/posts/all/${user.id}`
    );
    const data = await res.json();
    // console.log("fetchinggggg");

    // console.log(data);
    if (data) {
      setPosts(data);
    }
  };

  const fetchStories = async () => {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/stories/${user.id}`
    );
    const data = await res.json();
    // console.log(data);
    if (data) {
      setStories(data);
    } else {
      console.log("No stories found");
    }
  };

  useEffect(() => {
    savetokenToServer();
    fetchPosts();
    fetchStories();
  }, [router]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
      }}
    >
      {/* Posts */}
      <View
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <FlatList
          ListHeaderComponent={() => (
            <View>
              {/* Greeting  */}
              <View
                style={{
                  paddingRight: 24,
                  marginTop: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: 24,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Good Morning, {user?.username}.
                </Text>
                <Pressable
                  onPress={() => {
                    router.push("/messages");
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#727477",
                    borderRadius: 32,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      position: "relative",
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/Message.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        width: 6,
                        height: 6,
                        backgroundColor: "red",
                        right: 0,
                        borderRadius: 6,
                        top: 2,
                      }}
                    ></View>
                  </View>
                </Pressable>
              </View>

              {/* Stories */}
              {stories.length > 0 && (
                <View
                  style={{
                    marginTop: 30,
                    width: "100%",
                    // backgroundColor: "red",
                    height: 140,
                    flexDirection: "row",
                    paddingLeft: 24,
                  }}
                >
                  <FlatList
                    data={stories}
                    renderItem={(item) => <Story story={item.item} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      gap: 12,
                    }}
                  />
                </View>
              )}

              {/* border */}
              <View
                style={{
                  width: "100%",
                  borderBottomColor: "#323436",
                  borderBottomWidth: 1,
                  marginTop: 40,
                  marginBottom: 20,
                }}
              ></View>
            </View>
          )}
          data={posts}
          renderItem={(item) => <Post post={item.item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 20,
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
