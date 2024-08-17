import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";

const Comment = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "flex-start",
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 100,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
            resizeMode: "cover",
          }}
          source={require("../assets/images/Profile Photo.png")}
        />
      </View>
      <View
        style={{
          gap: 3,
        }}
      >
        <Text
          style={{
            color: "#ECEBED",
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          Jessica Thompson
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 13,
          }}
        >
          ❤️
        </Text>
        <Text
          style={{
            color: "#727477",
            fontSize: 13,
          }}
        >
          2m ago
        </Text>
      </View>
    </View>
  );
};

export default Comment;