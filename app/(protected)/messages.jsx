import { View, Text, TextInput, Image, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Friend from "../../components/Friend";
import Message from "../../components/Message";

const messages = () => {
  const friends = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  const messages = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
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