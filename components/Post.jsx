import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Story from "../components/Story";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../context/Auth";

const Post = ({ post }) => {
  const {
    user: { id },
  } = useAuth();
  const router = useRouter();

  const [like, setLike] = useState(post.isLiked);
  const [newLikeCount, setNewLikeCount] = useState(post.likes);
  // console.log(like);

  const addLike = async () => {
    setLike(!like);
    if (like) {
      setNewLikeCount(newLikeCount - 1);
    } else {
      setNewLikeCount(newLikeCount + 1);
    }
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post.id,
          userId: id,
        }),
      });
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
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
                source={{ uri: post.profilepictureurl }}
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
            onPress={() => {
              addLike();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {like ? (
              <AntDesign name="like1" size={24} color="#f62e8e" />
            ) : (
              <AntDesign name="like2" size={24} color="white" />
            )}
            <Text style={{ color: "white" }}>{newLikeCount}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push({
                pathname: `/post/${post.id}`,
              });
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome5 name="comment-dots" size={24} color="white" />
            <Text style={{ color: "white" }}>{post.comments}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Post;
