import { View, Text, TextInput, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Friend = ({ friend }) => {
  const router = useRouter();
  const { id } = friend;
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: `searchProfile/${id}`,
          params: {
            user: JSON.stringify(friend),
          },
        });
      }}
      style={{
        gap: 5,
        justifyContent: "center",
        width: 48,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 100,
        }}
      >
        <Image
          source={require("../assets/images/Profile Photo2.png")}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
            resizeMode: "cover",
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "semibold",
          color: "white",
          textAlign: "center",
        }}
      >
        Kim
      </Text>
    </Pressable>
  );
};

export default Friend;
