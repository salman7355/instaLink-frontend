import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Story from "../../../components/Story";
import Post from "../../../components/Post";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const router = useRouter();

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

  const posts = [
    {
      id: 1,
      image: false,
      isLiked: true,
    },
    {
      id: 2,
      image: true,
      isLiked: true,
    },
    {
      id: 3,
      image: false,
      isLiked: false,
    },
    {
      id: 4,
      image: false,
      isLiked: false,
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
                  Good Morning, Alex.
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
                    renderItem={(item) => <Story />}
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
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
