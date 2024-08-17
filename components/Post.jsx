import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Story from "../components/Story";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Post = ({ post }) => {
  // const { id, image } = post;
  const router = useRouter();
  // console.log(image);
  // console.log(post.imageurl);

  const handleLikes = () => {
    post.isLiked = !post.isLiked;
  };

  return (
    <View
      style={{
        borderBottomWidth: 1,
        paddingBottom: 25,
        borderBottomColor: "#323436",
      }}
    >
      <View
        style={{
          paddingHorizontal: 24,
          gap: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
              }}
            >
              <Image
                source={require("../assets/images/Profile Photo.png")}
                style={{
                  borderRadius: 32,
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#ECEBED",
                }}
              >
                {post.username}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#727477",
                }}
              >
                {post.timestamp}
              </Text>
            </View>
          </View>
          <Image source={require("../assets/images/Dots Vertical.png")} />
        </View>

        <Pressable
          onPress={() => {
            router.push({
              pathname: `/post/${post.id}`,
              params: {
                post: JSON.stringify(post),
              },
            });
          }}
          style={{
            gap: 10,
          }}
        >
          {post.imageurl && (
            <View
              style={{
                width: 327,
                height: 200,
              }}
            >
              <Image
                source={{ uri: post.imageurl }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "stretch",
                  borderRadius: 10,
                }}
              />
            </View>
          )}

          <Text
            style={{
              color: "#ECEBED",
              fontSize: 16,
              width: "90%",
            }}
          >
            {post.caption}
          </Text>
        </Pressable>

        <View style={{ flexDirection: "row", gap: 30 }}>
          <Pressable
            onPress={handleLikes}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {post.isLiked === true ? (
              <AntDesign name="like1" size={24} color="#f62e8e" />
            ) : (
              <AntDesign name="like2" size={24} color="white" />
            )}
            <Text style={{ color: "white" }}>{post.likes}</Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome5 name="comment-dots" size={24} color="white" />
            <Text style={{ color: "white" }}>{post.comments}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;
