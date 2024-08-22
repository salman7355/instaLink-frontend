import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../../components/Profile";

const SearchedUser = () => {
  const { id } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
      }}
    >
      <Profile myProfile={false} userId={id} />
    </View>
  );
};

export default SearchedUser;
