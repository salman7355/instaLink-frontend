import { View, Text, Image, FlatList, Pressable, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import Story from "../components/Story";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../context/Auth";
import { timeAgo } from "../utils/getTimeAgo";

const Post = ({ post }) => {
  const {
    user: { id },
  } = useAuth();
  const router = useRouter();

  const [like, setLike] = useState(post.isLiked);
  const [newLikeCount, setNewLikeCount] = useState(post.likes);
  const [lastTap, setLastTap] = useState(null);
  // console.log(like);

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // Time in ms to register a double tap

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      // Double tap detected, call the like function
      // Alert.alert("Double Tap", "Double tap detected");
      addLike();
    } else {
      // Single tap, just set the last tap timestamp
      setLastTap(now);
    }
  }, [lastTap]);

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
            <Pressable
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
            </Pressable>
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
                {timeAgo(post.timestamp)}
              </Text>
            </View>
          </View>
          <Image source={require("../assets/images/Dots Vertical.png")} />
        </View>

        <Pressable
          onPress={handleDoubleTap}
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
