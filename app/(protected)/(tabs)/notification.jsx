import { View, Text, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { idText } from "typescript";
import Notification from "../../../components/Notification";

const notification = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      isRead: false,
      type: "like",
    },
    {
      id: 2,
      isRead: false,
      type: "like",
    },
    {
      id: 3,
      isRead: false,
      type: "comment",
    },
    {
      id: 4,
      isRead: true,
      type: "comment",
    },
    {
      id: 5,
      isRead: true,
      type: "FR",
    },
  ]);

  const markAllAsRead = () => {
    alerts.map((alert) => {
      alert.isRead = true;
    });
    setAlerts([...alerts]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
      }}
    >
      <View
        style={{
          paddingRight: 24,
          marginTop: 60,
          paddingLeft: 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Alerts
        </Text>
        <Text
          onPress={markAllAsRead}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#F62E8E",
          }}
        >
          Mark all as read
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <FlatList
          data={alerts}
          renderItem={(item) => <Notification item={item.item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 10,
          }}
        />
      </View>
    </View>
  );
};

export default notification;
