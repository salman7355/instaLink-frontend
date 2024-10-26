import { View, Text, TextInput, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Friend from "../../components/Friend";
import Message from "../../components/Message";
import { useAuth } from "../../context/Auth";

const messages = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const getFriends = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/friends/all/${user.id}`
      );
      const data = await response.json();
      if (!data) {
        console.error("No friends found");
      }
      setFriends(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const messages = [
    {
      id: 1,
      username: "Marwan",
    },
    {
      id: 2,
      username: "Ramy",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  marginTop: 20,
                  height: 40,
                  backgroundColor: "#323436",
                  borderRadius: 32,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 14,
                  marginHorizontal: 24,
                }}
              >
                <TextInput
                  placeholder="Who do you want to chat with?"
                  placeholderTextColor="#ECEBED"
                  style={{
                    color: "#ECEBED",
                    fontSize: 14,
                    // paddingLeft: 14,
                  }}
                />
                <Ionicons name="search" size={24} color="#727477" />
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderBottomColor: "#323436",
                  borderTopColor: "#323436",
                  marginTop: 30,
                  paddingHorizontal: 24,
                  paddingVertical: 20,
                  gap: 20,
                }}
              >
                <Text
                  style={{
                    color: "#727477",
                    fontSize: 12,
                    letterSpacing: 2,
                  }}
                >
                  Friends
                </Text>

                <View>
                  <FlatList
                    data={friends}
                    renderItem={(friend) => <Friend friend={friend.item} />}
                    keyExtractor={(e) => e.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      gap: 30,
                    }}
                  />
                </View>
              </View>
            </View>
          )}
          data={messages}
          renderItem={(message) => <Message message={message.item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default messages;
