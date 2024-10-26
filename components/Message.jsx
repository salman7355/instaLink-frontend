import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Message = ({ message }) => {
  console.log(message);

  const { id } = message;
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: `chat/${id}`,
          params: {
            message: JSON.stringify(message),
          },
        });
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#323436",
        paddingHorizontal: 24,
        paddingVertical: 30,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
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
            gap: 4,
          }}
        >
          <Text
            style={{
              color: "#ECEBED",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {message.username}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 14,
            }}
          >
            Hey you! Are u there?
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: "#727477",
            fontSize: 12,
          }}
        >
          2h ago
        </Text>
      </View>
    </Pressable>
  );
};

export default Message;
