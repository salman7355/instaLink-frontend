import { View, Text, TextInput, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Friend = ({ friend }) => {
  const [friendData, setFriend] = useState([]);
  const router = useRouter();
  const { id } = friend;

  const getUser = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users/user/${friend.friend_id}`
      );
      const data = await response.json();
      if (!data) {
        console.error("No user found");
      }
      setFriend(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
        // width: 48,
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
          source={{ uri: friendData.profilepictureurl }}
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
        {friendData.username}
      </Text>
    </Pressable>
  );
};

export default Friend;
