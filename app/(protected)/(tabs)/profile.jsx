import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Post from "../../../components/Post";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Profile from "../../../components/Profile";
// import { process.env.EXPO_PUBLIC_API_URL } from "@env";
import { useAuth } from "../../../context/Auth";

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
