import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/Auth";
import { API_URL } from "@env";

const Input = ({ type, onCommentAdded }) => {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const inputRef = useRef();
  const [submit, setSubmit] = useState(false);

  const addComment = async () => {
    if (!comment.trim()) {
      return Alert.alert("Error", "Comment cannot be empty");
    }

    const res = await fetch(`${API_URL}/posts/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
        userId: user.id,
        comment: comment,
      }),
    });
    const data = await res.json();
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setSubmit(true);
    setComment("");
    onCommentAdded();
  };

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: 88,
        bottom: 0,
        backgroundColor: "black",
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#323436",
          borderRadius: 32,
          // paddingTop: 20,
          marginTop: 20,
          height: 40,
          paddingLeft: 24,
          paddingRight: 5,
        }}
      >
        <TextInput
          placeholder={
            type === "chat"
              ? "Type your message here..."
              : "Type your comment here..."
          }
          placeholderTextColor="#ECEBED"
          onChangeText={setComment}
          // blurOnSubmit={submit}
          ref={inputRef}
          style={{
            color: "#ECEBED",
            fontSize: 14,
          }}
        />
        <LinearGradient
          colors={["rgb(246, 46, 143)", "rgb(172, 26, 239)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="send" size={20} color="white" onPress={addComment} />
        </LinearGradient>
      </View>
    </View>
  );
};

export default Input;
