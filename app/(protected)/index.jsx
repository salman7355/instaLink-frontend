import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { useSegments } from "expo-router";

const Index = () => {
  const { user, signout } = useAuth();
  // console.log(user);
  const segments = useSegments();

  // useEffect(() => {
  //   // Log the current path segments
  //   console.log("Current path segments:", segments);

  //   // Optionally, join the segments to get the full path
  //   const fullPath = segments.join("/");
  //   console.log("Full path:", fullPath);
  // }, [segments]);
  return (
    <View>
      <Text>my appp</Text>

      <Text
        style={{
          width: 300,
          height: 50,
          backgroundColor: "blue",
        }}
        onPress={signout}
      >
        signout
      </Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
