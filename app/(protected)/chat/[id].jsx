import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../../components/Input";

const ChatPage = () => {
  const { message } = useLocalSearchParams();
  const { id } = JSON.parse(message);
  const router = useRouter();
  const navigaton = useNavigation();

  useEffect(() => {
    navigaton.setOptions({
      // headerTitle: id.toString(),
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              router.push("/messages");
            }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 32,
              borderColor: "#323436",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back-outline" size={16} color="white" />
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 100,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                  resizeMode: "contain",
                }}
                source={require("../../../assets/images/Profile Photo.png")}
              />
            </View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: 1,
              }}
            >
              {id} Jessica tompson
            </Text>
          </View>
        </View>
      ),
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
      }}
    >
      <Text>ChatPage</Text>
      <Text>{id}</Text>

      <Input type="chat" />
    </View>
  );
};

export default ChatPage;
