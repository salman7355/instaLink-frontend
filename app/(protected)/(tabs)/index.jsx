import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  PanResponder,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import Story from "../../../components/Story";
import Post from "../../../components/Post";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stories, setStories] = useState([]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          router.push("/messages");
        }
      },
    })
  ).current;

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };

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
      {...panResponder.panHandlers}
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
