import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { idText } from "typescript";
import Notification from "../../../components/Notification";
import { useAuth } from "../../../context/Auth";

const notification = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [allread, setAllRead] = useState(false);

  const markAllAsRead = async () => {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/notification/mark-all-read`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      }
    );
    const data = await res.json();
    if (data) {
      setAllRead(true);
    }
  };

  const getAllNotifications = async () => {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/notification/${user.id}`
    );
    const data = await res.json();
    console.log(data);
    if (data) {
      setAlerts(data);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, [allread]);

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
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                }}
              >
                You have no notifications
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default notification;
