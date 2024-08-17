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

const profile = () => {
  const [selectedTab, setSelectedTab] = useState("posts");

  const myPosts = [
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
  ];

  const myLikes = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
      }}
    >
      <Profile myProfile={true} />
    </SafeAreaView>
  );
};

export default profile;
