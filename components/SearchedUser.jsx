import { View, Text, TextInput, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SearchedUser = ({ user }) => {
  const { id } = user;
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: `searchProfile/${id}`,
          params: {
            user: JSON.stringify(user),
          },
        });
      }}
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 45,
          height: 45,
          borderRadius: 45,
        }}
      >
        <Image
          source={require("../assets/images/Profile Photo.png")}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "white",
          }}
        >
          Salman Mohamed
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "white",
          }}
        >
          31.8 followers
        </Text>
      </View>
    </Pressable>
  );
};

export default SearchedUser;
