import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Story = () => {
  return (
    <View
      style={{
        height: "100%",
        width: 100,
        backgroundColor: "gray",
        borderRadius: 16,
        position: "relative",
      }}
    >
      <Image
        source={require("../assets/images/Rectangle 6.png")}
        style={{
          borderRadius: 16,
          height: "100%",
          width: "100%",
          resizeMode: "cover",
        }}
      />
      <LinearGradient
        colors={["rgb(246, 46, 143)", "rgb(172, 26, 239)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          position: "absolute",
          //   backgroundColor: "blue",
          width: 40,
          height: 40,
          borderRadius: 40,
          bottom: 10,
          left: "50%",
          marginLeft: -20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            // position: "absolute",
            width: "90%",
            height: "90%",

            borderRadius: 40,
          }}
        >
          <Image
            source={require("../assets/images/Profile Photo.png")}
            style={{
              borderRadius: 40,
              height: "100%",
              width: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Story;
