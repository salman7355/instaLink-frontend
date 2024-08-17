import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Notification = ({ item }) => {
  const { id, isRead, type } = item;
  return (
    <View
      style={{
        borderBottomColor: "#323436",
        borderBottomWidth: 1,
        width: "100%",
      }}
    >
      <View
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
          {type == "like" ? (
            <AntDesign name="like2" size={16} color="#2E8AF6" />
          ) : type == "comment" ? (
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
              fontWeight: isRead ? "200" : "bold",
              fontSize: 14,

              color: "#ECEBED",
            }}
          >
            Marwan liked your post
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#727477",
            }}
          >
            10m ago
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notification;
