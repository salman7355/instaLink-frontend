import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { timeAgo } from "../utils/getTimeAgo";

const Notification = ({ item }) => {
  const router = useRouter();

  const handleRoute = () => {
    if (item.type === "like" || item.type === "comment") {
      router.push(`/(protected)/post/${item.post_id}`);
    } else {
      router.push(`/(protected)/profile/${item.user_id}`);
    }
  };

  // const timeAgo = (date) => {
  //   const now = new Date();
  //   const createdTime = new Date(date);
  //   const diff = Math.floor((now - createdTime) / 1000);

  //   const timeIntervals = {
  //     year: 31536000,
  //     month: 2592000,
  //     week: 604800,
  //     day: 86400,
  //     hour: 3600,
  //     minute: 60,
  //     second: 1,
  //   };

  //   for (const [unit, secondsInUnit] of Object.entries(timeIntervals)) {
  //     const interval = Math.floor(diff / secondsInUnit);
  //     if (interval >= 1) {
  //       return interval + unit[0] + " ago"; // e.g., '2h ago', '15m ago', etc.
  //     }
  //   }

  //   return "just now";
  // };

  return (
    <View
      style={{
        borderBottomColor: "#323436",
        borderBottomWidth: 1,
        width: "100%",
      }}
    >
      <Pressable
        onPress={handleRoute}
        style={{
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: "#323436",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.type == "like" ? (
            <AntDesign name="like2" size={16} color="#2E8AF6" />
          ) : item.type == "comment" ? (
            <AntDesign name="message1" size={16} color="#F62E8E" />
          ) : (
            <AntDesign name="adduser" size={16} color="#ac1af0" />
          )}
        </View>
        <View
          style={{
            gap: 3,
          }}
        >
          <Text
            style={{
              fontWeight: item.is_read ? "200" : "bold",
              fontSize: 14,

              color: "#ECEBED",
            }}
          >
            {item.message}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#727477",
            }}
          >
            {timeAgo(item.created_at)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Notification;
