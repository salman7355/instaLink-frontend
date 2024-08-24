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
import { API_URL } from "@env";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

const index = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const [expoPushToken, setExpoPushToken] = useState();

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

  const savetokenToServer = async (token) => {
    const response = await fetch(`${API_URL}/Notification/save-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        user_id: user.id,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchPosts = async () => {
    const res = await fetch(`${API_URL}/posts/all`);
    const data = await res.json();

    // console.log(data);
    if (data) {
      setPosts(data);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      // console.log(token);
      // console.log(user.id);

      savetokenToServer(token);
    });
    fetchPosts();
  }, [router]);

  const stories = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ];

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
              {/* {stories.length > 0 && (
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
                    renderItem={(item) => <Story />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      gap: 12,
                    }}
                  />
                </View>
              )} */}

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
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
