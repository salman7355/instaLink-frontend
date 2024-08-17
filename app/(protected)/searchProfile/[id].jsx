import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../../components/Profile";

const SearchedUser = () => {
  const { user } = useLocalSearchParams();
  const { id } = JSON.parse(user);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
      }}
    >
      <Profile myProfile={false} />
    </View>
  );
};

export default SearchedUser;
