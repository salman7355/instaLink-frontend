import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../../../components/Profile";
import { useAuth } from "../../../../context/Auth";

const profile = () => {
  const {
    user: { id },
  } = useAuth();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
      }}
    >
      <Profile myProfile={true} userId={id} />
    </SafeAreaView>
  );
};

export default profile;
