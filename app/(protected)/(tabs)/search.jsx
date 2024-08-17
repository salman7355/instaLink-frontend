import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SearchedUser from "../../../components/SearchedUser";
import { useNavigation, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const search = () => {
  const navigation = useNavigation();

  const router = useRouter();
  const [search, setSearch] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        navigation.setOptions({ tabBarStyle: { display: "none" } });
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        navigation.setOptions({
          tabBarStyle: {
            display: "flex",
            height: 80, // Increase the height as desired
            paddingBottom: 10, // Adjust padding as needed
            paddingTop: 10, // Adjust padding as needed
            backgroundColor: "#000000", // Background color for the tab bar
          },
        });
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, [navigation])
  );

  const users = [
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
  ];

  return (
    <View
      onTouchStart={Keyboard.dismiss}
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
        paddingTop: 70,
        paddingHorizontal: 28,
        gap: 30,
      }}
    >
      <View
        style={{
          // width: "100%",
          height: 45,
          backgroundColor: "#323436",
          borderRadius: 32,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 16,
        }}
      >
        <TextInput
          onChangeText={setSearch}
          placeholder="Search for people"
          style={{
            color: "#727477",
            fontSize: 14,
          }}
          placeholderTextColor="#727477"
        />
        <Ionicons name="search" size={20} color="#727477" />
      </View>

      <View
        style={{
          flex: 1,
          paddingBottom: 20,
        }}
      >
        <FlatList
          data={users}
          renderItem={(user) => <SearchedUser user={user.item} />}
          keyExtractor={(user) => user.id}
          contentContainerStyle={{
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default search;
